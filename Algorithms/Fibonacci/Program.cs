using System;

namespace Fibonacci
{
    class Program
    {
        static void Main(string[] args)
        {
            for (int i = 0; i < 10; i++)
                Console.Write($"{fibonacci(i)} ");
            Console.WriteLine();
        }

        static int fibonacci(int i, int[] memo = null)
        {
            if (0 == i || 1 == i) return i;
            if (null == memo) return fibonacci(i, new int[i + 1]);
            if (0 == memo[i])
                memo[i] = fibonacci(i - 1, memo) + fibonacci(i - 2, memo);
            return memo[i];
        }
    }
}
