
abstract class App {

  // TypeScript allows entrypoint methods as async.
  // We wait on the RunAsync method so that the finish
  // line runs last.
  public static async main() {
    console.log("Started");
    await this.RunAsync();
    console.log("Finished");
  }

  public static async RunAsync() {
    // The await keyword ensures the promise
    // completes before returning.
    await App.delay(2000).then(() => {
      console.log("Hello World!");
    });
  }

  // Delay function to return a promise.
  private static delay = (ms: number) => new Promise(res => setTimeout(res, ms));
}

App.main();
