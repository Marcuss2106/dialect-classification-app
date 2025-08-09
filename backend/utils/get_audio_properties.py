from pydub import AudioSegment
import io

BITS_PER_SAMPLE_PER_CHANNEL = 8

def get_audio_properties(file_bytes: bytes):
	audio = AudioSegment.from_file(io.BytesIO(file_bytes))
	sample_rate = audio.frame_rate  # in Hz
	bit_rate = audio.frame_width * BITS_PER_SAMPLE_PER_CHANNEL * audio.frame_rate * audio.channels

	return sample_rate, bit_rate