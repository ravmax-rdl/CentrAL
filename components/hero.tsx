import Image from 'next/image';
import SplitText from './ui/SplitText';
import Magnet from './Animations/Magnet';

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <Magnet padding={150} disabled={false} magnetStrength={30}>
        <div className="relative py-16">
          {/* Blurred copy for glow effect */}
          <Image
            src="/images/logowhite.png"
            alt=""
            width={800}
            height={100}
            className="absolute top-0 left-0 right-0 rounded-lg blur-lg opacity-50 translate-y-16"
          />
          {/* Main logo */}
          <Image
            src="/images/logowhite.png"
            alt="CentrAL Logo"
            width={800}
            height={100}
            className="relative rounded-lg"
          />
        </div>
      </Magnet>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <div className="text-4xl lg:text-4xl !leading-tight mx-auto max-w-2xl text-center">
        <SplitText
          text="CentrAL aims to be an educational resource sharing hub."
          delay={10}
          duration={2}
          ease="elastic.out(1, 0.3)"
          splitType="words"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>
    </div>
  );
}
