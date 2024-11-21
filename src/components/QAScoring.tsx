import React from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';

interface QAScoringProps {
  callId: string;
  agentId: string;
}

const QAScoring: React.FC<QAScoringProps> = ({ callId, agentId }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const totalScore = Object.values(data.categories).reduce(
      (acc: number, curr: number) => acc + curr,
      0
    );

    const score = {
      callId,
      agentId,
      evaluatorId: 'current-user-id', // Replace with actual evaluator ID
      categories: data.categories,
      notes: data.notes,
      totalScore,
    };

    // Submit score
    await qaService.scoreCall(score);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Call Quality Assessment</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Scoring Categories */}
        <div className="space-y-4">
          {['greeting', 'communication', 'problemSolving', 'closing', 'compliance'].map((category) => (
            <div key={category} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="flex flex-col items-center">
                    <input
                      type="radio"
                      {...register(`categories.${category}`)}
                      value={score}
                      className="sr-only"
                    />
                    <Star
                      className={`w-8 h-8 cursor-pointer ${
                        score <= 3 ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-600">{score}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            {...register('notes')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default QAScoring;