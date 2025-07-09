import Image from 'next/image';

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <Image
        src="/images/logowhite.png"
        alt="CentrAL Logo"
        width={400}
        height={100}
        className="rounded-lg"
      />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      <p className="text-2xl lg:text-2xl !leading-tight mx-auto max-w-xl text-center">
        CentrAL aims to be a educational resource sharing hub.
      </p>
    </div>
  );
}
