// WARNING
//
// This file has been generated automatically by Xamarin Studio from the outlets and
// actions declared in your storyboard file.
// Manual changes to this file will not be maintained.
//
using Foundation;
using System;
using System.CodeDom.Compiler;
using UIKit;

namespace HelloiPhone
{
	[Register ("SecondController")]
	partial class SecondController
	{
		[Outlet]
		[GeneratedCode ("iOS Designer", "1.0")]
		UIButton close { get; set; }

		void ReleaseDesignerOutlets ()
		{
			if (close != null) {
				close.Dispose ();
				close = null;
			}
		}
	}
}
