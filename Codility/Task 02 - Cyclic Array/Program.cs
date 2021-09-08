using System;

namespace CyclicRotation
{
    class Program
    {
        static void Main(string[] args)
        {
            render(solution(new int[] {1, 2, 3, 4, 5}, 8));
            render(solution(new int[] {5, -1000}, 1));
        }

        private static void render(int[] A)
        {
            if (null == A) return;
            for (var i = 0 ; i < A.Length; i++)
                Console.Write(A[i] + " ");
            Console.WriteLine();
        }

        private static int[] solution(int[] A, int K)
        {
            if (null == A) return null;
            if (0 == A.Length) return A;
            int[] result = new int[A.Length];
            int chunk = K % A.Length;
            for (var i = 0; i < A.Length; i++)
                result[i] = (i < chunk) 
                    ? A[(A.Length - chunk) + i]
                    : A[i - chunk];
            return result;
         }
    }
}
