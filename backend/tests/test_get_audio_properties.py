from pydub import AudioSegment
from utils.get_audio_properties import get_audio_properties
import pytest
import io

@pytest.fixture
def test_audio_bytes():
    with open("tests/test_audio.wav", "rb") as f:
        return f.read()

BITS_PER_SAMPLE_PER_CHANNEL = 8

def test_get_audio_properties(test_audio_bytes):
    sample_rate, bit_rate = get_audio_properties(test_audio_bytes)
    
    audio = AudioSegment.from_file(io.BytesIO(test_audio_bytes))
    expected_sample_rate = audio.frame_rate
    expected_bit_rate = audio.frame_width * BITS_PER_SAMPLE_PER_CHANNEL * audio.frame_rate * audio.channels
    
    assert sample_rate == expected_sample_rate, "Sample rate does not match"
    assert bit_rate == expected_bit_rate, "Bit rate does not match"
