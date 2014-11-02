# noisy

This is some Web Audio API stuff for producing noise similar to [BrainWave Generator](http://www.bwgen.com/) presets.

This is known to work in Chrome 39 and Firefox 33. Chrome on Android may not work so well on older devices.

Look out for WebKit [112521](https://bugs.webkit.org/show_bug.cgi?id=112521), which causes the modulators to stop working if you have not retained a reference to either the GainModulatorNode or a preset containing the GainModulatorNode. This is handled in the demo by storing the preset instance into the window.

Currently the ScriptProcessorNode functionality used for every interesting node here is deprecated and slated to be replaced by Web Audio Workers, but no browser supports Web Audio Workers yet.
