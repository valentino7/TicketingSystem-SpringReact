package it.uniroma2.ticketingsystem.ml.matrix;

import org.apache.commons.math3.linear.RealMatrix;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class MatrixUtils {

    static NumberFormat formatter = new DecimalFormat("#0.00");

    public static void printMatrix(RealMatrix matrix){
        for (int i = 0; i < matrix.getColumnDimension(); i++) {
            System.out.println("");
            for (int j = 0; j < matrix.getRowDimension(); j++) {
                System.out.print(formatter.format(matrix.getEntry(j,i))+"\t");
            }
        }
    }

}
