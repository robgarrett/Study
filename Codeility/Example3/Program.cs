using System;

namespace Example3
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(solution(new int[] {9,3,9,3,9,7,9}));
        }

        public static int solution(int[] A)
        {
            // write your code in C# 6.0 with .NET 4.5 (Mono)
            if (null == A) throw new ArgumentNullException();
            if ((A.Length % 2) == 0) throw new ArgumentOutOfRangeException();
            Array.Sort<int>(A);
            for (int i = 0; i < A.Length;) 
            {
                int instances = 1;
                for (int j = i + 1; j < A.Length; j++)
                    if (A[j] == A[i])
                        instances++;
                    else
                        break;
                if (0 != (instances % 2)) return A[i]; 
                i += instances;
            }
            return -1;
        }
    }
}
