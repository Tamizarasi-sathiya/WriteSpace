import TopicSuggester from '@/components/TopicSuggester';
import AnimatedSection from '@/components/AnimatedSection';

export default function SuggestTopicsPage() {
    return (
        <div className="container py-12 max-w-3xl mx-auto">
            <AnimatedSection animation="slide-in-up" className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold mb-2">Topic Suggester</h1>
                <p className="text-muted-foreground text-lg">Stuck on what to write? Get some AI-powered inspiration!</p>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-up" delay={0.1}>
                <TopicSuggester />
            </AnimatedSection>
        </div>
    );
}
