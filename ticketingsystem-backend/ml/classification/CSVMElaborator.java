package it.uniroma2.ticketingsystem.ml.classification;

import it.uniroma2.sag.kelp.data.dataset.SimpleDataset;
import it.uniroma2.sag.kelp.data.example.Example;
import it.uniroma2.sag.kelp.kernel.Kernel;
import it.uniroma2.sag.kelp.kernel.cache.FixSizeKernelCache;
import it.uniroma2.sag.kelp.kernel.cache.KernelCache;
import it.uniroma2.sag.kelp.kernel.standard.LinearKernelCombination;
import it.uniroma2.sag.kelp.kernel.standard.NormalizationKernel;
import it.uniroma2.sag.kelp.kernel.standard.PolynomialKernel;
import it.uniroma2.sag.kelp.kernel.tree.SubSetTreeKernel;
import it.uniroma2.sag.kelp.kernel.vector.LinearKernel;
import it.uniroma2.sag.kelp.learningalgorithm.classification.libsvm.BinaryCSvmClassification;
import it.uniroma2.sag.kelp.learningalgorithm.classification.multiclassification.OneVsAllLearning;
import it.uniroma2.sag.kelp.predictionfunction.classifier.ClassificationOutput;
import it.uniroma2.sag.kelp.predictionfunction.classifier.Classifier;
import it.uniroma2.sag.kelp.utils.JacksonSerializerWrapper;
import it.uniroma2.sag.kelp.utils.evaluation.MulticlassClassificationEvaluator;
import it.uniroma2.ticketingsystem.domain.Ticket;
import it.uniroma2.ticketingsystem.ml.constant.Const;


public class CSVMElaborator {

    public static Ticket computeCSVM(String kernelType, float C_Parameter, Ticket ticket, String IDFFilename) throws Exception {

        String datasetFilename = Const.LOCAL_CLUSTERING_PATH // local_dataset_path
                + Const.s + ticket.getTarget().getId() // /target
                + Const.s + Const.CLUSTERING_KLP; // /dataset.klp

        String classificationPath = Const.LOCAL_CLASSIFICATION_PATH // local_classification_path
                + Const.s + ticket.getTarget().getId(); // /ticket_id

        String exampleFilename = classificationPath
                + Const.s + Const.VECTOR_KLP; // /dataset.klp

        // Read the training and test dataset
        SimpleDataset trainingSet = new SimpleDataset();
        trainingSet.populate(datasetFilename);

        SimpleDataset testSet = new SimpleDataset();
        testSet.populate(exampleFilename);

        // calculating the size of the gram matrix to store all the examples
        int cacheSize = trainingSet.getNumberOfExamples() + 1;

        // Initialize the proper kernel function
        Kernel usedKernel = null;
        usedKernel = getKernel(kernelType, usedKernel);

        // Setting the cache to speed up the computations
        KernelCache cache = new FixSizeKernelCache(cacheSize);
        usedKernel.setKernelCache(cache);

        // Instantiate the SVM learning Algorithm.
        BinaryCSvmClassification svmSolver = new BinaryCSvmClassification();
        //Set the kernel
        svmSolver.setKernel(usedKernel);
        //Set the C parameter
        svmSolver.setCn(C_Parameter);
        svmSolver.setCp(C_Parameter);

        // Instantiate the multi-class classifier that apply a One-vs-All schema
        OneVsAllLearning ovaLearner = new OneVsAllLearning();
        ovaLearner.setBaseAlgorithm(svmSolver);
        ovaLearner.setLabels(trainingSet.getClassificationLabels());

        // Writing the learning algorithm and the kernel to file
        JacksonSerializerWrapper serializer = new JacksonSerializerWrapper();
        serializer.writeValueOnFile(ovaLearner, classificationPath + Const.s + "ova_learning_algorithm.klp");

        //Learn and get the prediction function
        ovaLearner.learn(trainingSet);
        //Selecting the prediction function
        Classifier classifier = ovaLearner.getPredictionFunction();
        // Write the model (aka the Classifier for further use)
        serializer.writeValueOnFile(classifier, classificationPath + Const.s + "model_kernel-" + kernelType + "_cp" +
                C_Parameter + "_cn" + C_Parameter + ".klp");

        //Building the evaluation function
        MulticlassClassificationEvaluator evaluator = new MulticlassClassificationEvaluator(
                trainingSet.getClassificationLabels());

        //Classify examples and compute the accuracy
        for (Example e : testSet.getExamples()) {
            // Predict the class
            ClassificationOutput p = classifier.predict(e);
            evaluator.addCount(e, p);
            System.out.println("Original class:\t" + e.getClassificationLabels());
            System.out.println("Predicted class:\t" + p.getPredictedClasses());
            System.out.println();

            ticket.setCategory(p.getPredictedClasses().toString());
        }

        System.out.println("Accuracy: " + evaluator.getAccuracy());

        return ticket;
    }

    private static Kernel getKernel(String kernelType, Kernel usedKernel) {
        if (kernelType.equalsIgnoreCase("lin")) {
            String vectorRepresentationName = "bow";
            Kernel linearKernel = new LinearKernel(vectorRepresentationName);
            usedKernel = linearKernel;
        } else if (kernelType.equalsIgnoreCase("poly")) {
            String vectorRepresentationName = "bow";
            int exponent = 2;
            Kernel linearKernel = new LinearKernel(vectorRepresentationName);
            Kernel polynomialKernel = new PolynomialKernel(exponent, linearKernel);
            usedKernel = polynomialKernel;
        } else if (kernelType.equalsIgnoreCase("tk")) {
            String treeRepresentationName = "grct";
            float lambda = 0.4f;
            Kernel tkgrct = new SubSetTreeKernel(lambda, treeRepresentationName);
            usedKernel = tkgrct;
        } else if (kernelType.equalsIgnoreCase("comb")) {
            String vectorRepresentationName = "bow";
            String treeRepresentationName = "grct";
            float lambda = 0.4f;

            Kernel linearKernel = new LinearKernel(vectorRepresentationName);
            Kernel tkgrct = new SubSetTreeKernel(lambda, treeRepresentationName);

            LinearKernelCombination combination = new LinearKernelCombination();
            combination.addKernel(1, linearKernel);
            combination.addKernel(1, tkgrct);
            usedKernel = combination;
        } else if (kernelType.equalsIgnoreCase("comb-norm")) {
            String vectorRepresentationName = "bow";
            String treeRepresentationName = "grct";
            float lambda = 0.4f;

            Kernel linearKernel = new LinearKernel(vectorRepresentationName);
            Kernel normalizedLinearKernel = new NormalizationKernel(linearKernel);
            Kernel treeKernel = new SubSetTreeKernel(lambda, treeRepresentationName);
            Kernel normalizedTreeKernel = new NormalizationKernel(treeKernel);

            LinearKernelCombination combination = new LinearKernelCombination();
            combination.addKernel(1, normalizedLinearKernel);
            combination.addKernel(1, normalizedTreeKernel);
            usedKernel = combination;
        } else {
            System.err.println("The specified kernel (" + kernelType + ") is not valid.");
        }
        return usedKernel;
    }
}
