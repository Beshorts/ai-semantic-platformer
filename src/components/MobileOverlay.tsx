

export default function MobileOverlay() {
    return(
         <section className="flex md:hidden flex-1 flex-col items-center justify-center p-10 text-center bg-white">
        <p className="text-sm uppercase tracking-widest leading-relaxed">
          This experience requires a <strong>Desktop Browser</strong> and{" "}
          <strong>Keyboard</strong> to interact with the AI and play.
        </p>
      </section>
    )
}