import { SetRecorder } from "./Recorder";

let _mediaStream = null;

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    _mediaStream = stream;

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      };
    });
  } catch (err) {
    console.error(err);
  }
}

export function saveRecording(recorder: any) {
  if (recorder && recorder.state !== "inactive") recorder.stop();
}
