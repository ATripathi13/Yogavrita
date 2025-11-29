import { ClassSequence, DayOfWeek } from '../models/types';

// NOTE: These are sample sequences. Update with actual sequences from the Word document.
// Each asana duration should match the times specified in "Class Sequence Correct.docx"

const mondaySequence: ClassSequence = {
  day: 'Monday',
  asanas: [
    {
      id: 'mon-1',
      name: 'Mountain Pose (Tadasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Stand tall with feet together, arms at sides'
    },
    {
      id: 'mon-2',
      name: 'Forward Fold (Uttanasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Fold forward from hips, let head hang'
    },
    {
      id: 'mon-3',
      name: 'Downward Dog (Adho Mukha Svanasana)',
      durationSeconds: 120,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Form inverted V-shape with body'
    },
    {
      id: 'mon-4',
      name: 'Warrior I (Virabhadrasana I)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Lunge position with arms raised'
    },
    {
      id: 'mon-5',
      name: 'Child\'s Pose (Balasana)',
      durationSeconds: 120,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Rest with forehead on mat, arms extended'
    }
  ],
  totalDurationSeconds: 480
};

const tuesdaySequence: ClassSequence = {
  day: 'Tuesday',
  asanas: [
    {
      id: 'tue-1',
      name: 'Cat-Cow Pose (Marjaryasana-Bitilasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Alternate between arching and rounding spine'
    },
    {
      id: 'tue-2',
      name: 'Plank Pose',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Hold body in straight line, arms extended'
    },
    {
      id: 'tue-3',
      name: 'Cobra Pose (Bhujangasana)',
      durationSeconds: 75,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Lift chest, keep hips on ground'
    },
    {
      id: 'tue-4',
      name: 'Bridge Pose (Setu Bandhasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Lift hips while lying on back'
    },
    {
      id: 'tue-5',
      name: 'Seated Forward Bend (Paschimottanasana)',
      durationSeconds: 120,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Fold forward over extended legs'
    }
  ],
  totalDurationSeconds: 435
};

const wednesdaySequence: ClassSequence = {
  day: 'Wednesday',
  asanas: [
    {
      id: 'wed-1',
      name: 'Sun Salutation A (Surya Namaskar A)',
      durationSeconds: 180,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Flow through 12 poses'
    },
    {
      id: 'wed-2',
      name: 'Triangle Pose (Trikonasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Extend arms and legs in triangle shape'
    },
    {
      id: 'wed-3',
      name: 'Tree Pose (Vrksasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Balance on one leg, hands in prayer'
    },
    {
      id: 'wed-4',
      name: 'Pigeon Pose (Eka Pada Rajakapotasana)',
      durationSeconds: 120,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Hip opener with one leg folded forward'
    }
  ],
  totalDurationSeconds: 450
};

const thursdaySequence: ClassSequence = {
  day: 'Thursday',
  asanas: [
    {
      id: 'thu-1',
      name: 'Warrior II (Virabhadrasana II)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Wide stance with arms extended'
    },
    {
      id: 'thu-2',
      name: 'Extended Side Angle (Utthita Parsvakonasana)',
      durationSeconds: 75,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Deep lunge with arm extended overhead'
    },
    {
      id: 'thu-3',
      name: 'Half Moon Pose (Ardha Chandrasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Balance on one leg with body parallel to ground'
    },
    {
      id: 'thu-4',
      name: 'Seated Twist (Ardha Matsyendrasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Twist spine while seated'
    },
    {
      id: 'thu-5',
      name: 'Corpse Pose (Savasana)',
      durationSeconds: 180,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Lie flat, completely relaxed'
    }
  ],
  totalDurationSeconds: 495
};

const fridaySequence: ClassSequence = {
  day: 'Friday',
  asanas: [
    {
      id: 'fri-1',
      name: 'Chair Pose (Utkatasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Squat position with arms raised'
    },
    {
      id: 'fri-2',
      name: 'Eagle Pose (Garudasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Balance with arms and legs wrapped'
    },
    {
      id: 'fri-3',
      name: 'Boat Pose (Navasana)',
      durationSeconds: 45,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Balance on sitting bones, legs and torso lifted'
    },
    {
      id: 'fri-4',
      name: 'Bow Pose (Dhanurasana)',
      durationSeconds: 60,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Lie on belly, hold ankles and lift'
    },
    {
      id: 'fri-5',
      name: 'Legs Up the Wall (Viparita Karani)',
      durationSeconds: 180,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Lie with legs extended up against wall'
    }
  ],
  totalDurationSeconds: 405
};

const saturdaySequence: ClassSequence = {
  day: 'Saturday',
  asanas: [
    {
      id: 'sat-1',
      name: 'Sun Salutation B (Surya Namaskar B)',
      durationSeconds: 240,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Flow through extended sun salutation'
    },
    {
      id: 'sat-2',
      name: 'Crow Pose (Bakasana)',
      durationSeconds: 45,
      breathingPattern: 'hold',
      breathingCycleSeconds: 6,
      instructions: 'Arm balance with knees on elbows'
    },
    {
      id: 'sat-3',
      name: 'Shoulder Stand (Sarvangasana)',
      durationSeconds: 120,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 8,
      instructions: 'Inversion with shoulders supporting body'
    },
    {
      id: 'sat-4',
      name: 'Fish Pose (Matsyasana)',
      durationSeconds: 90,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 6,
      instructions: 'Arch back with crown of head on ground'
    },
    {
      id: 'sat-5',
      name: 'Final Relaxation (Savasana)',
      durationSeconds: 300,
      breathingPattern: 'inhale-exhale',
      breathingCycleSeconds: 10,
      instructions: 'Complete rest and integration'
    }
  ],
  totalDurationSeconds: 795
};

// Export all sequences
export const CLASS_SEQUENCES: ClassSequence[] = [
  mondaySequence,
  tuesdaySequence,
  wednesdaySequence,
  thursdaySequence,
  fridaySequence,
  saturdaySequence
];

// Helper function to get sequence by day
export function getSequenceByDay(day: DayOfWeek): ClassSequence | undefined {
  return CLASS_SEQUENCES.find(seq => seq.day === day);
}

// Helper function to get today's sequence
export function getTodaySequence(): ClassSequence | undefined {
  const days: DayOfWeek[] = ['Sunday' as any, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const dayName = days[today];
  
  // Sunday returns undefined (no practice on Sunday)
  if (dayName === 'Sunday') return undefined;
  
  return getSequenceByDay(dayName as DayOfWeek);
}
