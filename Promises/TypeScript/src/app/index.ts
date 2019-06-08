
abstract class App {

  public static main() {
    App.delayAsync(2000).then(() => {
      console.log("Hello World!");
    });
  }

  // Delay function to return a promise.
  private static delayAsync = (ms: number) => new Promise(res => setTimeout(res, ms));

}

App.main();
