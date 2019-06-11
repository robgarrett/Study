using System;
using System.Threading;
using System.Threading.Tasks;

namespace C_
{
    class Program
    {
        static Task<bool> LegacyDelay(int ms)
        {
            // We use a TSC when wrapping legacy callback async methods
            // that don't implement a task. For the sake of simplicity
            // I'll use Task.Delay here. I could just as easy return 
            // the result of Task.Delay, but want to demonstrate TSC.
            var tsc = new TaskCompletionSource<bool>();
            Task.Delay(ms).ContinueWith(Task => tsc.SetResult(true));
            return tsc.Task;
        }

        static async Task DelayAsync(int ms)
        {
            Console.WriteLine("Delay started");
            // The await ensures that LegacyDelay completes before
            // the rest of this method is executed. If not complete
            // when called, execution is passed to the calling method
            // and a continuation point is added for returning when
            // LegacyDelay does complete.
            await LegacyDelay(ms);
            // Rest of code executed after LegacyDelay completes.
            Console.WriteLine("Delay completed");
        }

        static async Task Main(string[] args)
        {
            // C# now supports async in Main.
            Console.WriteLine("Started");
            var delayTask = DelayAsync(2000).ContinueWith(task => {
                Console.WriteLine("Hello World!");
            });
            // Control should pass back here while the delay is running.
            Console.WriteLine("Doing other things...");
            await delayTask;
            // The above await ensures that the rest
            // of this method doesn't run until the 
            // DelayAsync method completes.
            Console.WriteLine("Finished");
        }
    }
}
