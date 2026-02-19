import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
import { useMemo } from 'react';

const SkillStats = ({ videos }) => {
    // Calculate average stats from videos
    const stats = useMemo(() => {
        if (!videos || videos.length === 0) {
            return {
                speed: 0,
                agility: 0,
                accuracy: 0,
                reaction: 0,
                overall: 0
            };
        }

        const total = videos.reduce((acc, video) => {
            // Check if video has aiScores
            if (video.aiScores) {
                acc.speed += video.aiScores.speed || 0;
                acc.agility += video.aiScores.agility || 0;
                acc.accuracy += video.aiScores.accuracy || 0;
                acc.reaction += video.aiScores.reaction || 0;
            } else if (video.speedScore) { // Fallback to flat structure if any
                acc.speed += video.speedScore || 0;
                acc.agility += video.agilityScore || 0;
                acc.accuracy += video.accuracyScore || 0;
                acc.reaction += video.reactionScore || 0;
            }
            return acc;
        }, { speed: 0, agility: 0, accuracy: 0, reaction: 0 });

        const count = videos.length;

        // Calculate averages
        const speed = Math.round(total.speed / count);
        const agility = Math.round(total.agility / count);
        const accuracy = Math.round(total.accuracy / count);
        const reaction = Math.round(total.reaction / count);
        const overall = Math.round((speed + agility + accuracy + reaction) / 4);

        return { speed, agility, accuracy, reaction, overall };
    }, [videos]);

    const skills = [
        { name: 'Speed', score: stats.speed, color: 'blue', icon: Zap },
        { name: 'Agility', score: stats.agility, color: 'green', icon: Activity },
        { name: 'Accuracy', score: stats.accuracy, color: 'purple', icon: Target },
        { name: 'Reaction', score: stats.reaction, color: 'orange', icon: TrendingUp },
    ];

    if (!videos || videos.length === 0) {
        return (
            <div className="bg-slate-900 rounded-xl border border-white/10 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    AI Skill Analysis
                </h3>
                <p className="text-gray-400 text-sm">Upload videos to get your AI Skill Assessment.</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 rounded-xl border border-white/10 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-500" />
                AI Skill Analysis
            </h3>

            <div className="space-y-6">
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center text-sm font-medium text-gray-300">
                                <skill.icon className={`w-4 h-4 mr-2 text-${skill.color}-500`} />
                                {skill.name}
                            </div>
                            <span className="text-white font-bold">{skill.score}</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`bg-${skill.color}-500 h-2.5 rounded-full`}
                                style={{ width: `${skill.score}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Overall Rating</span>
                    <span className="text-2xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                        {stats.overall}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SkillStats;
