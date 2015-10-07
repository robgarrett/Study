using System;

using UIKit;

namespace HelloiPhone
{
	public partial class ViewController : UIViewController
	{
		public ViewController (IntPtr handle) : base (handle)
		{
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			int count = 0;
			button.TouchUpInside += (object sender, EventArgs e) => label.Text = String.Format("Count: {0}", ++count);
		}

		public override void DidReceiveMemoryWarning ()
		{
			base.DidReceiveMemoryWarning ();
			// Release any cached data, images, etc that aren't in use.
		}
	}
}

