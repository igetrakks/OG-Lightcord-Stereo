//META{"name":"stereoSound"}*//

function () {
	let VoiceConnection = BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection;

	class Stereo extends VoiceConnection {
		constructor(a, b, c, d, e) {
			super(a, b, c, d, e);
			this.origin = super.setTransportOptions;
		}

		setTransportOptions(obj) {
			console.log(obj)
			if (obj.audioEncoder) {
				obj.audioEncoder.params = { stereo: "2" };
				obj.audioEncoder.channels = 2;
        obj.audioEncoder.pacsize = 960
			}
			
			if (obj.fec) {
				obj.fec = false;
			}

			if (obj.encodingVoiceBitRate < 384000) {
				obj.encodingVoiceBitRate = 384000;
			}

			this.origin(obj);
			window.sound = this;
		}
	}

	return class _ {
		getName() { return "Lightcord Stereo" }
		getDescription() { return " Stereo for the Lightcord Client" }
		getAuthor() { return "Lucifer" }
		getVersion() { return "1" }

		load() { }

		start() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = Stereo;
		}

		stop() {
			BDV2.WebpackModules.findByUniqueProperties(['getVoiceEngine']).getVoiceEngine().VoiceConnection = VoiceConnection;
		}
	};
}();
