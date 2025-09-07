import { getPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, BrainCircuit, Edit, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative scroll-smooth">
      <section id="welcome" className="h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <div className="absolute top-[10vh] left-[5vw] w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-[50vh] right-[10vw] w-64 h-64 bg-accent/5 rounded-2xl blur-3xl animate-pulse delay-200"></div>
        </div>
        <div className="bg-background/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            <AnimatedSection animation="fade-in">
                <span className="block text-2xl md:text-3xl font-normal">Welcome to</span>
            </AnimatedSection>
            <span className="block text-6xl md:text-8xl bg-gradient-to-r from-primary via-teal-400 to-accent bg-clip-text text-transparent animate-gradient-pan bg-[200%_auto] animate-text-reveal [animation-fill-mode:backwards]">Write Space</span>
          </h1>
          <AnimatedSection animation="fade-in" delay={1.5}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore a collection of insightful articles and stories. Create, share, and discover content that matters.
            </p>
          </AnimatedSection>
        </div>
        <a href="#features" className="absolute bottom-12 animate-bounce">
          <ArrowDown className="w-8 h-8 text-foreground/50"/>
        </a>
      </section>

      <section id="features" className="min-h-screen container mx-auto py-16 md:py-24 flex flex-col items-center justify-center">
        <AnimatedSection animation="blur-in" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Why Write Space?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">We provide the tools to make your blogging experience seamless and enjoyable.</p>
        </AnimatedSection>
        <div className="grid gap-8 md:grid-cols-3">
            <AnimatedSection animation="blur-in" delay={0.1}>
              <Card className="bg-card/80 backdrop-blur-md text-center h-full animated-gradient-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader>
                      <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                          <BrainCircuit className="w-8 h-8" />
                      </div>
                      <CardTitle className="font-headline">AI-Powered Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">Never run out of ideas. Get AI-powered topic suggestions to keep your content fresh and engaging.</p>
                  </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="blur-in" delay={0.2}>
              <Card className="bg-card/80 backdrop-blur-md text-center h-full animated-gradient-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader>
                      <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                          <Edit className="w-8 h-8" />
                      </div>
                      <CardTitle className="font-headline">Simple Post Creation</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">A clean and intuitive editor makes it easy to write, edit, and publish your posts.</p>
                  </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection animation="blur-in" delay={0.3}>
              <Card className="bg-card/80 backdrop-blur-md text-center h-full animated-gradient-border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader>
                      <div className="mx-auto bg-primary/20 text-primary p-4 rounded-full w-fit mb-4">
                          <Palette className="w-8 h-8" />
                      </div>
                      <CardTitle className="font-headline">Elegant Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">Focus on your writing with a beautifully simple and responsive design that looks great on any device.</p>
                  </CardContent>
              </Card>
            </AnimatedSection>
        </div>
      </section>

      <section id="content" className="min-h-screen py-16 md:py-24">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} animation="blur-in" delay={0.1 * (i + 1)}>
                <PostCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
            <AnimatedSection animation="blur-in" className="w-full max-w-2xl">
              <div className="text-center py-20 bg-card/30 backdrop-blur-sm border-2 border-dashed rounded-2xl">
                <h2 className="text-2xl font-headline font-semibold mb-2">No posts yet.</h2>
                <p className="text-muted-foreground mb-4">Be the first one to create a post!</p>
                <div>
                  <Link href="/posts/new">
                    <Button>Create New Post</Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
      </section>
    </div>
  );
}
