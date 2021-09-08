using System;

namespace BinaryGaps
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(solution(1041));
        }

        private static int solution(int N)
        {
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
