using System;
using System.Threading;
using System.Threading.Tasks;

namespace C_
{
    class Program
    {
        static async Task RunAsync()
        {
            // Use an async method because main doesn't support it.
            // Can await on any promise.
            await DelayAsync(2000).ContinueWith(task => {
                Console.WriteLine("Hello World!");
            });
        }

        static Task DelayAsync(int ms)
        {
            // Create a promise (TCS) and trigger promise after delay
            // of ms milliseconds.
            var tsc = new TaskCompletionSource<bool>();
            var fireAndForgetTask = Task.Delay(ms).ContinueWith(task => tsc.SetResult(true));
            // Execute the task async associated with the promise (TCS).
            return tsc.Task;
        }

        static void Main(string[] args)
        {
            // Unlike TypeScript, we cannot make the main method
            // async, which means we can't use "await" on the aync task.
            // However, we can wait methods that return a Task object.
            // Without the wait, execution would complete the finish step
            // and fall out the bottom of the app before the async task completed.
            Console.WriteLine("Started");
            RunAsync().Wait();
            Console.WriteLine("Finished");
        }
    }
}
