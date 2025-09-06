import TopicSuggester from '@/components/TopicSuggester';

export default function SuggestTopicsPage() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Topic Suggester</h1>
                <p className="text-muted-foreground text-lg">Stuck on what to write? Get some AI-powered inspiration!</p>
            </div>
            <TopicSuggester />
        </div>
    );
}
