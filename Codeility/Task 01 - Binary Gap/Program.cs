using System;

namespace BinaryGap
{
    // you can also use other imports, for example:
    // using System.Collections.Generic;

    // you can write to stdout for debugging purposes, e.g.
    // Console.WriteLine("this is a debug message");

    class Program
    {
        public static void Main()
        {
            solution(32);
        }

        public static int solution(int N)
        {
            // write your code in C# 6.0 with .NET 4.5 (Mono)
            string nStr = Convert.ToString(N, 2);
            int gapLen = 0;
            var gaps = nStr.Split('1');
            // Must have a 1 either side, so first and last don't count.
            for (int i = 1; i < gaps.Length - 1; i++)
                if (gaps[i].Length > gapLen)
                    gapLen = gaps[i].Length;
            return gapLen;
        }
    }
}
