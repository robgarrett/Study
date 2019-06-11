
abstract class App {

  public static async main() {
    console.log("Started");
    const promise = this.DelayAsync(2000).then(() => {
      console.log("Hello World!");
    });
    // Control should pass back here while the delay is running.
    console.log("Doing other things...");
    await promise;
    // The above await ensures that the rest
    // of this method doesn't run until the
    // DelayAsync method completes.
    console.log("Finished");
  }

  public static async DelayAsync(ms: number) {
    console.log("Delay started");
    // The await ensures that LegacyDelay completes before
    // the rest of this method is executed. If not complete
    // when called, execution is passed to the calling method
    // and a continuation point is added for returning when
    // LegacyDelay does complete.
    await App.LegacyDelay(ms);
    console.log("Delay completed");
  }

  // Delay function to return a promise.
  private static LegacyDelay = (ms: number) => new Promise(res => setTimeout(res, ms));
}

App.main();
