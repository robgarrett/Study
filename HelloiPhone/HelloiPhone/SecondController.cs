using Foundation;
using System;
using System.CodeDom.Compiler;
using UIKit;

namespace HelloiPhone
{
	partial class SecondController : UIViewController
	{
		public SecondController (IntPtr handle) : base (handle)
		{
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();
			close.TouchUpInside += (object sender, EventArgs e) => DismissViewController(true, null);
		}
	}
}
