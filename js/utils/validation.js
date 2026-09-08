import { z } from 'zod';

const OptionSchema = z.object({
  id: z.number().int().positive(),
  text: z.string().min(1),
  correct: z.boolean(),
  message: z.string(),
});

const QuestionSchema = z.object({
  id: z.number().int().positive(),
  text: z.string().min(1),
  type: z.enum(['single', 'multiple']),
  options: z.array(OptionSchema).min(1),
}).refine(
  (question) => {
    const correctCount = question.options.filter(opt => opt.correct).length;
    if (question.type === 'single') {
      return correctCount === 1;
    }
    return correctCount >= 1;
  },
  {
    message: 'Для single должен быть ровно 1 правильный ответ, для multiple — хотя бы 1.',
    path: ['options'],
  }
);

export const quizSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  questions: z.array(QuestionSchema).min(1),
});

