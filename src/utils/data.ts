import moment from "moment";

export const languageList = [
  { name: "English", id: "en" },
  { name: "हिंदी", id: "hi" },
  { name: "मराठी", id: "mr" },
  { name: "ગુજરાતી", id: "gu" },
  { name: "മലയാളം", id: "ml" },
  { name: "ਪੰਜਾਬੀ", id: "pa" },
  { name: "తెలుగు", id: "te" },
  { name: "ଓଡିଆ", id: "or" },
  { name: "ಕನ್ನಡ", id: "kn" },
  { name: "বাঙালি", id: "bn" },
  { name: "தமிழ்", id: "ta" },
  { name: "اردو", id: "ur" },
  { name: "অসমীয়া", id: "as" },
];

export const languageListEnglish = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Telugu", value: "te" },
  { label: "Tamil", value: "ta" },
  { label: "Bengali", value: "bn" },
  { label: "Kannada", value: "kn" },
  { label: "Malayalam", value: "ml" },
  { label: "Marathi", value: "mr" },
  { label: "Gujarati", value: "gu" },
  { label: "Urdu", value: "ur" },
  { label: "Punjabi", value: "pa" },
  { label: "Odia", value: "or" },
  { label: "Assamese", value: "as" },
];

export const getLabelFromValue = (value: any) => {
  const language = languageListEnglish.find((lang) => lang.value === value);
  return language ? language.label : "";
};

export function isResponse(transcript: any, language: string) {
  let positiveResponses, negativeResponses;

  positiveResponses = [
    "yes",
    "correct",
    "okay",
    "ok",
    "fine",
    "yeah",
    "right",
    "sahi",
  ];
  negativeResponses = [
    "no",
    "not correct",
    "wrong",
    "not right",
    "not yet",
    "galat",
    "nahi",
  ];

  if (
    positiveResponses.some((response) =>
      transcript.toLowerCase().includes(response)
    )
  ) {
    return "positive";
  }

  if (
    negativeResponses.some((response) =>
      transcript.toLowerCase().includes(response)
    )
  ) {
    return "negative";
  }
}

function isValidMonth(month: number): boolean {
  return month >= 1 && month <= 12;
}

function isValidDay(year: number, month: number, day: number): boolean {
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInFebruary = isLeapYear ? 29 : 28;
    return day >= 1 && day <= daysInFebruary;
  } else {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= lastDayOfMonth;
  }
}

export function formatDateToYYYYMMDD(dateString: string): string | undefined {
  // Remove ordinals from the input date string
  dateString = dateString.replace(/(\d+)(st|nd|rd|th)/g, "$1");
  let parsedDate;
  if (moment(dateString).isValid()) {
    parsedDate = new Date(dateString);

    // Check if the parsed date is a future date
    const currentDate = new Date();
    if (parsedDate > currentDate) {
      console.error("Future date not allowed.");
      return undefined;
    }
  } else {
    return undefined;
  }

  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();

  if (!isValidMonth(month) || !isValidDay(year, month, day)) {
    console.error(`Invalid date format: ${dateString}`);
    return undefined;
  }

  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");
  const yyyymmdd = `${year}${formattedMonth}${formattedDay}`;
  return moment(yyyymmdd).format("YYYY-MM-DD");
}

export const playAudioURL = (
  audioURLs: string[],
  isSpeechRecognitionSupported: any,
  startRecognition: any,
  requestPermission: any
) => {
  let currentAudioIndex = 0;
  const audios: HTMLAudioElement[] = audioURLs
    .filter((item) => item !== undefined && item !== null && item.length > 0)
    .map((url) => new Audio(url));

  const handleAudioEnded = () => {
    currentAudioIndex++;
    if (currentAudioIndex < audios.length) {
      playNextAudio();
    } else {
      // Perform actions when all audios finish playing
      isSpeechRecognitionSupported() ? startRecognition() : requestPermission();
    }
  };

  const playNextAudio = () => {
    if (currentAudioIndex < audios.length) {
      const audio = audios[currentAudioIndex];
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      audio.addEventListener("ended", handleAudioEnded);
    }
  };

  playNextAudio();

  return () => {
    audios.forEach((audio) => {
      if (!audio.paused) {
        audio.pause();
      }
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleAudioEnded);
    });
  };
};

const voices = {
  en: {
    voice1:
      "https://storage.googleapis.com/ami-tts-storage/837aff98-8275-4d1b-a7b9-a350b8d5d007.wav",
    voice2:
      "https://storage.googleapis.com/ami-tts-storage/428b4643-5354-4cbd-a1d0-3e2c76652ed5.wav",
    voice3:
      "https://storage.googleapis.com/ami-tts-storage/5f7f38ec-d292-42e1-9b0b-6bdd1986752a.wav",
    voice4:
      "https://storage.googleapis.com/ami-tts-storage/a2b6eb53-79a3-4c5b-a195-1d742d18dfdd.wav",
    voice5:
      "https://storage.googleapis.com/ami-tts-storage/00906b67-040a-4063-b4fe-d1f25ddbad38.wav",
  },
  hi: {
    voice1:
      "https://storage.googleapis.com/ami-tts-storage/d31f1cf2-bde3-4311-9cde-cab7cf97746d.wav",
    voice2:
      "https://storage.googleapis.com/ami-tts-storage/c39856bc-bac3-4c86-a260-4b2093594dfd.wav",
    voice3:
      "https://storage.googleapis.com/ami-tts-storage/2befe40a-2c3e-4ea8-9c27-15042b3e6a08.wav",
    voice4:
      "https://storage.googleapis.com/ami-tts-storage/58e9d4d0-553b-4ef6-9405-141076afa763.wav",
    voice5:
      "https://storage.googleapis.com/ami-tts-storage/a396e349-bfcc-462d-98a2-7d61cd8306d6.wav",
  },
};

export const getFrequentVoice = (language: "en" | "hi"): string => {
  const voicesForLanguage = voices[language] as any;
  const voiceKeys = Object.keys(voicesForLanguage);
  const randomKey = voiceKeys[Math.floor(Math.random() * voiceKeys.length)];
  return voicesForLanguage[randomKey];
};

export const filterValue = (value: string | number) => {
  return typeof value === "string"
    ? value.replace(/[^a-zA-Z0-9\s]|\.+$/g, "")
    : String(value).replace(/[^a-zA-Z0-9\s]|\.+$/g, "");
};
