import { getPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown, BrainCircuit, Edit, Palette, Feather, BookOpen, PenTool } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import ParallaxWrapper from '@/components/ParallaxWrapper';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="relative scroll-smooth overflow-x-clip">
      {/* Decorative Parallax Elements */}
      <ParallaxWrapper>
        {/* Background Shapes (Madhubani-inspired) */}
        <div data-speed="0.2" className="absolute top-0 left-0 w-full h-full z-[-1]">
          <div className="absolute top-[10vh] left-[5vw] w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-[50vh] right-[10vw] w-64 h-64 bg-accent/5 rounded-2xl blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-[90vh] left-[15vw] w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
           <div className="absolute top-[150vh] right-[5vw] w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Foreground Icons */}
        <div data-speed="-0.1" className="absolute top-[20vh] left-[15vw] z-10 opacity-30">
          <Feather className="w-24 h-24 text-primary/50 -rotate-12" />
        </div>
        <div data-speed="-0.15" className="absolute top-[70vh] right-[20vw] z-10 opacity-30">
          <BookOpen className="w-32 h-32 text-accent/50 rotate-12" />
        </div>
         <div data-speed="-0.12" className="absolute top-[120vh] left-[10vw] z-10 opacity-30">
          <PenTool className="w-28 h-28 text-primary/50 rotate-6" />
        </div>
      </ParallaxWrapper>


      <section id="welcome" className="h-screen flex flex-col items-center justify-center text-center p-4 relative">
        <AnimatedSection animation="blur-in">
          <div className="bg-background/30 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4">
              Welcome to <span className="bg-gradient-to-r from-primary via-teal-400 to-accent bg-clip-text text-transparent animate-gradient-pan bg-[200%_auto]">PostCraft</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore a collection of insightful articles and stories. Create, share, and discover content that matters.
            </p>
          </div>
        </AnimatedSection>
        <a href="#features" className="absolute bottom-12 animate-bounce">
          <ArrowDown className="w-8 h-8 text-foreground/50"/>
        </a>
      </section>

      <section id="features" className="min-h-screen container mx-auto py-16 md:py-24 flex flex-col items-center justify-center">
        <AnimatedSection animation="blur-in" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Why PostCraft?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">We provide the tools to make your blogging experience seamless and enjoyable.</p>
        </AnimatedSection>
        <div className="grid gap-8 md:grid-cols-3">
            <AnimatedSection animation="blur-in" delay={0.1}>
              <Card className="bg-card/30 backdrop-blur-md border-border/20 text-center h-full">
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
              <Card className="bg-card/30 backdrop-blur-md border-border/20 text-center h-full">
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
              <Card className="bg-card/30 backdrop-blur-md border-border/20 text-center h-full">
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
