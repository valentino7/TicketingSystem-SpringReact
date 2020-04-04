package it.uniroma2.ticketingsystem.ml.text;

import org.apache.commons.math3.linear.MatrixUtils;
import org.apache.commons.math3.linear.RealMatrix;
import org.apache.commons.math3.linear.SingularValueDecomposition;

import static it.uniroma2.ticketingsystem.ml.matrix.MatrixUtils.printMatrix;

public class LSAElaborator {

    private static RealMatrix U, V, S;
    private static RealMatrix reducedU, reducedV, reducedS;
    private static int reductionFactor;
    private static SingularValueDecomposition SVD;

    private static void computeSVD(double [][] termsDocs){

        RealMatrix termsDocsMatrix = MatrixUtils.createRealMatrix(termsDocs);

        // compute the singular value decomposition
        System.out.println("A = U S V^T");
        System.out.println();
        SVD = new SingularValueDecomposition(termsDocsMatrix);

        System.out.println("S Rank : "+SVD.getRank());

        U = SVD.getU();
        System.out.println("U - Rows: "+U.getRowDimension()+" / Columns: "+U.getColumnDimension());

        S = SVD.getS();
        System.out.println("Sigma - Rows: "+S.getRowDimension()+" / Columns: "+S.getColumnDimension());

        V = SVD.getV().transpose();
        System.out.println("V - Rows: "+V.getRowDimension()+" / Columns: "+V.getColumnDimension());

        System.out.print("rank = " + SVD.getRank());
        System.out.println("condition number = " + SVD.getConditionNumber());
        System.out.println("2-norm = " + SVD.getNorm());

        // print out singular values
        System.out.print("singular values = ");

        RealMatrix svalues = MatrixUtils.createRowRealMatrix(SVD.getSingularValues());

    }

    public static RealMatrix computeLSA(double[][] termsDocs, int reductionInPercentage){

        RealMatrix reducedMatrix;

        computeSVD(termsDocs);

        reductionFactor = (S.getColumnDimension()*reductionInPercentage/100) + getZerosSingleValues();

        reducedU = U.getSubMatrix(0,U.getRowDimension()-1,0,(U.getColumnDimension()-1)-reductionFactor);
        System.out.println("U reduced - Rows: "+reducedU.getRowDimension()+" / Columns: "+reducedU.getColumnDimension());
        reducedS = S.getSubMatrix(0,(S.getRowDimension()-1)-reductionFactor,0,(S.getColumnDimension()-1)-reductionFactor);//.times(S.times(V.transpose()));
        System.out.println("Sigma reduced - Rows: "+reducedS.getRowDimension()+" / Columns: "+reducedS.getColumnDimension());
        reducedV = V.getSubMatrix(0,(V.getRowDimension()-1)-reductionFactor,0,V.getColumnDimension()-1);
        System.out.println("V reduced- Rows: "+reducedV.getRowDimension()+" / Columns: "+reducedV.getColumnDimension());

        System.out.println("Reduce % :"+reductionInPercentage);
        System.out.println("Reduce di :"+reductionFactor);
        System.out.println("U Reduced Matrix :");
        printMatrix(U);
        System.out.println("\nS Reduced Matrix :");
        printMatrix(S);
        System.out.println("\nV* Reduced Matrix :");
        printMatrix(V);


        System.out.println("Reduced U Column: "+reducedU.getColumnDimension()+"  -  Rows: "+reducedU.getRowDimension());

        reducedMatrix = reducedU.multiply(reducedS.multiply(reducedV));
        System.out.println("Reduced Matrix - Rows: "+reducedMatrix.getRowDimension()+" / Columns: "+reducedMatrix.getColumnDimension());

        return reducedMatrix;

    }

    private static int getZerosSingleValues(){
        int count = 0;
        double[] zeros = SVD.getSingularValues();
        for (int i = 0; i < zeros.length; i++) {
            if(String.valueOf(zeros[i]).contains("E-")) count++;
        }
        return count;
    }

}
