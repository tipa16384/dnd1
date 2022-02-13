package mapvalidate;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;


public class ValidateMap {

	public static void main(String[] none) throws IOException {
		// TODO Auto-generated method stub
		
		/*
		Console c = System.console();
		
        if (c == null) {
            System.err.println("No console.");
            System.exit(1);
        }
        */

		InputStreamReader cin = new InputStreamReader(System.in);
		Path path = Paths.get("C:\\Users\\Thomas\\Workspace\\mapvalidate\\res\\DNG1");
		
        
  		System.out.println("Enter your filename: ");
           
        int[][] matrix = {
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0},
        		{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0}
        };
        
        FileReader inputStream = null;
        int w;
        String file = path.toString();
        
        try {
        	inputStream = new FileReader(file);
        	
            for (int m=0;m<26;m++) {
            	for (int n=0;n<26;n++){
            		w = inputStream.read();
            		matrix[m][n] = w.toInt();
            	//	System.out.println("Coordinate (" + m + "," + n + ") = " + w);
            	}
            }
            
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }
        
        boolean valid = false;
        
        for (int m=1;m<25;m++) {
        	
        	for (int n=1;n<25;n++) {
        		
        		valid = false;
        		if (matrix[m-1][n] != 1) { 
        			valid = true;
        		}
        		if (matrix[m+1][n] != 1) { 
        			valid = true;
        		}
        		if (matrix[m][n-1] != 1) { 
        			valid = true;
        		}
        		if (matrix[m][n+1] != 1) { 
        			valid = true;
        		}
        		if (valid = false) {
        			System.out.println("Invalid starting position at: (" + m + "," + n + ")");
        		}
        	}
        }
        
        	System.out.println("End of dungeon file.");
            return; 
        }
	}    	

