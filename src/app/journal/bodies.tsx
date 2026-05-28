import Link from "next/link";
import type { ReactNode } from "react";
import { PILLARS, type BodyKey } from "./posts";

/**
 * Shared inline components for journal article bodies.
 * Body content is plain JSX so we avoid an MDX dependency
 * while keeping author voice + internal links explicit.
 */

function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 text-[1.0625rem] md:text-lg leading-[1.75] text-foreground/85">
      {children}
    </p>
  );
}

function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-16 font-serif text-[clamp(1.75rem,3vw,2.5rem)] tracking-tight leading-[1.1]"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-10 font-serif text-2xl tracking-tight leading-tight">
      {children}
    </h3>
  );
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-6 space-y-3 text-[1.0625rem] md:text-lg leading-[1.7] text-foreground/85 list-disc pl-6 marker:text-[var(--brass)]">
      {children}
    </ul>
  );
}

function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-10 mb-4 border-l-2 border-[var(--brass)] pl-6 font-serif italic text-xl md:text-2xl leading-snug text-foreground/90">
      {children}
    </blockquote>
  );
}

function PillarLink({
  slug,
  label,
}: {
  slug: keyof typeof PILLARS;
  label?: string;
}) {
  const p = PILLARS[slug];
  return (
    <Link
      href={p.href}
      className="underline decoration-[var(--brass)]/50 underline-offset-4 hover:decoration-foreground transition-colors"
    >
      {label ?? p.label}
    </Link>
  );
}

/* ---------------- 1. Implant cost (Transparent Pricing) ~1500w ---------------- */

function ImplantCostBody() {
  return (
    <>
      <P>
        <strong>How much does a dental implant cost in Dharan?</strong> It is
        the first question almost every patient asks, and it is also the one we
        cannot answer in a single number on a website. A dental implant is not
        a product you pick off a shelf — it is a small medical procedure shaped
        by your bone, your gum health, the implant system that suits your case,
        and the kind of tooth we put on top. What we can do, on this page, is
        walk you through every variable that moves the price, so when we sit
        down for an assessment you know exactly why the estimate looks the way
        it does.
      </P>

      <H2>Why a flat price is rarely an honest price</H2>
      <P>
        You will sometimes see implant prices advertised as a single figure.
        It is appealing — it gives you something concrete to plan around. The
        problem is that an implant case is closer to a tailored garment than a
        retail item. Two patients walking in with a single missing molar can
        have very different needs. One might have dense, healthy bone and an
        easy direct placement. The other might need bone augmentation, a sinus
        lift, or staged surgery before an implant can be placed safely. A
        single advertised number flattens that reality, and it usually means
        either the lowest case is being quoted or important steps are hidden.
      </P>
      <P>
        At Om Sai Dental Implant Center we prefer to estimate <em>after</em> we
        have looked at your radiographs and your gum tissue, not before. The
        estimate you receive is itemised: surgical fee, implant fixture,
        abutment, crown, any grafting, and follow-up visits. That way you can
        see exactly where the money goes and why.
      </P>

      <H2>Variable 1 — the implant system</H2>
      <P>
        The implant fixture itself is a titanium screw that integrates with
        your jawbone, and it is the single largest line item in most estimates.
        Globally there are a handful of well-documented implant systems, and
        their costs vary by a factor of two or three. The premium European and
        Swiss systems carry decades of peer-reviewed evidence and long-term
        survival data. Reliable Korean and Israeli systems offer strong
        evidence at a lower price point and are widely used across South Asia.
        Both categories are clinically sound when placed by a qualified
        operator — the difference shows up in surface technology, available
        prosthetic parts, and how easy it is to source components a decade
        from now.
      </P>
      <P>
        We discuss system choice with you openly. A consultant periodontist
        will recommend the system that fits your bone biology and your budget,
        not the one that pays the highest margin.
        {" "}
        <PillarLink slug="implants" label="Read about the implant approach we take" />.
      </P>

      <H2>Variable 2 — your bone</H2>
      <P>
        An implant needs bone to integrate with. When a tooth has been missing
        for years, the bone that used to support it slowly recedes — the body
        reabsorbs what it no longer needs. By the time you sit in the chair,
        there may not be enough vertical or horizontal bone to place an
        implant of the right size. In those cases we plan a graft: a small
        volume of bone material (often synthetic or processed allograft) is
        placed to rebuild the ridge. Sometimes that happens at the same visit
        as the implant; sometimes it needs to heal first.
      </P>
      <P>
        In the upper back jaw, the floor of the maxillary sinus can sit very
        close to where an implant needs to go. A sinus lift gently raises that
        floor and adds bone beneath it. Each of these adjuncts adds time,
        materials, and a separate fee. None of them is performed routinely —
        only when the imaging shows we need it.
      </P>

      <Pull>
        Bone condition is the single biggest reason two patients with the
        same missing tooth end up with very different estimates.
      </Pull>

      <H2>Variable 3 — the restoration on top</H2>
      <P>
        The visible part of the implant — the crown — is a separate decision
        from the fixture below the gum. A monolithic zirconia crown is strong,
        biocompatible, and aesthetic for most positions. A layered porcelain
        crown can look more lifelike in the smile line but is more technique
        sensitive. A screw-retained crown allows easier retrievability if a
        component ever needs servicing; a cement-retained crown can give
        better aesthetics in some anterior cases. Each option carries its own
        material cost and laboratory fee.
      </P>
      <P>
        If you are replacing several teeth, the conversation shifts. A bridge
        on two implants can replace three or four teeth more economically than
        three separate implants. A full-arch fixed solution — sometimes
        described as four or six implants supporting a complete arch — has a
        very different fee structure again. The right answer depends on what
        is missing, your bite, and your long-term plan.
      </P>

      <H2>Variable 4 — diagnostics and planning</H2>
      <P>
        A serious implant case is planned, not improvised. That planning
        typically involves a clinical examination, digital periapical and
        panoramic radiographs, and — for complex cases — a CBCT scan that
        produces a three-dimensional view of the jaw. CBCT lets us measure
        bone width, plan around nerves and sinuses, and place the implant in
        the position that suits the future crown rather than the position that
        the bone happens to allow.
        {" "}
        <span>
          <em>
            {"<!-- proof-gap: clinic CBCT availability — owner to confirm whether scanning is in-house or referred -->"}
          </em>
        </span>
      </P>
      <P>
        The diagnostic fee is usually modest but it is real, and we show it as
        a separate line. It is the foundation on which everything else
        depends, and skipping it is one of the most common reasons implant
        cases fail later.
      </P>

      <H2>Variable 5 — follow-up and aftercare</H2>
      <P>
        A well-placed implant needs review. The fixture is checked at one
        week, again at the end of the osseointegration window (usually three
        to six months), and then at the abutment and crown stages. After the
        crown is fitted we ask you back for a hygiene review and a periodontal
        check, because the long-term survival of an implant has more to do
        with gum health around it than with the metal itself.
      </P>
      <P>
        These visits are quoted as part of the original plan. There is no
        surprise cost for being a careful patient.
      </P>

      <H2>How Om Sai keeps the estimate transparent</H2>
      <UL>
        <li>
          <strong>Written estimate after imaging.</strong> We do not give a
          number on the phone. We give a written, itemised estimate after we
          have seen your radiographs and examined your tissues.
        </li>
        <li>
          <strong>System options on the table.</strong> Where two implant
          systems are clinically appropriate, we present both with a clear
          fee difference so you can choose with us.
        </li>
        <li>
          <strong>Staged consent.</strong> If a graft or sinus lift becomes
          necessary, you are told before it is performed, not after.
        </li>
        <li>
          <strong>One clinician, one plan.</strong> Your case is led by Dr.
          Ajit Yadav from assessment through final restoration — no handoffs
          to unknown operators.
        </li>
      </UL>

      <H2>What we will not publish until we can stand behind it</H2>
      <P>
        You will notice this guide does not quote a specific rupee figure for
        a single implant. That is deliberate. Until we can show a published
        price list that reflects the systems we currently stock, the lab fees
        we currently pay, and the imaging we currently use, putting a number
        on a webpage would be misleading. We would rather give you a clear,
        accurate estimate in the chair than a tidy figure online that does
        not survive contact with your actual case.
        {" "}
        <span>
          <em>
            {"<!-- proof-gap: published implant price ranges — owner to approve a tiered range (e.g. by system) before publishing -->"}
          </em>
        </span>
      </P>

      <H2>Spreading the cost across the timeline</H2>
      <P>
        An implant case is rarely paid as a single lump sum, because the
        work itself is not delivered as a single appointment. A typical
        plan separates the surgical fee (paid around the day of
        placement), any grafting materials (at the same stage), and the
        prosthetic fee (paid around the impression and crown delivery,
        months later). That natural staging gives most patients several
        months to budget between deposits, without us needing to offer a
        formal credit arrangement.
      </P>
      <P>
        If you are weighing this case against treatment in Kathmandu or
        across the border, remember to add return travel, accommodation,
        and the cost of any review visits to the headline figure. A local
        plan often looks closer on paper than it first appears, and it
        gives you a clinician within easy reach if something needs
        attention in year two or year five.
      </P>

      <H2>Common questions about the estimate</H2>
      <H3>Why did my friend pay less?</H3>
      <P>
        Because their case was probably different. A friend with intact
        bone, a single molar gap, and a routine system choice will sit
        at the lower end of the range. A case requiring a graft, a
        higher-evidence system, or a more aesthetic crown will sit
        higher. Same procedure name, very different clinical work.
      </P>
      <H3>Is the lowest-priced option ever the right option?</H3>
      <P>
        Cost should never be the only criterion, and it should never be
        ignored either. The honest framing is value over a fifteen-year
        horizon — the implant system with documented long-term survival
        and easily-sourced replacement parts is usually the calmer
        decision, even when it is not the lowest line item on the
        estimate.
      </P>
      <H3>What happens if something goes wrong?</H3>
      <P>
        Implants can, rarely, fail to integrate. When they do, the
        fixture is removed, the site is allowed to heal, and a new plan
        is made. We discuss what we would do in that scenario as part
        of the original consent, so it is not a conversation you have
        to have under stress.
      </P>

      <H2>What to bring to your assessment</H2>
      <UL>
        <li>
          Any recent dental radiographs, even if they were taken elsewhere.
        </li>
        <li>
          A list of current medications and known medical conditions —
          diabetes, blood thinners, and bisphosphonates all affect planning.
        </li>
        <li>
          A clear sense of which teeth concern you most, and how long they
          have been an issue.
        </li>
      </UL>

      <P>
        For a deeper walk through the surgery itself, read{" "}
        <PillarLink slug="implants" label="our specialist implant guide" />.
        For the broader pricing principles that shape every estimate we
        write, the{" "}
        <Link
          href="/pricing-guide"
          className="underline decoration-[var(--brass)]/50 underline-offset-4 hover:decoration-foreground"
        >
          pricing guide
        </Link>{" "}
        is the right next step.
      </P>
    </>
  );
}

/* ---------------- 2. Procedure step-by-step (Specialist Authority) ~2000w ---------------- */

function ImplantProcedureBody() {
  return (
    <>
      <P>
        A dental implant is not a single appointment. It is a sequence of
        carefully staged visits spread over a few months, with each stage
        depending on the one before it. Patients who understand the sequence
        in advance tend to be calmer in the chair and better prepared at
        home. This guide walks through every stage of a routine single
        implant — assessment, planning, surgery, healing, abutment, and crown
        — in the order it happens at Om Sai Dental Implant Center in Dharan.
      </P>

      <H2>Stage 1 — the first consultation</H2>
      <P>
        The first appointment is a conversation as much as an examination.
        Dr. Ajit Yadav asks about the tooth or teeth you want to replace,
        when you lost them, what has been tried before, and what you want the
        outcome to look like. A periodontist also asks about gum bleeding,
        diabetes, smoking, and any medication that affects bone healing — all
        of these influence whether an implant is the right answer at all.
      </P>
      <P>
        A clinical examination follows. We look at the gum tissue around the
        gap, the bite on the opposing arch, the health of neighbouring teeth,
        and the available space. Photographs are taken so we can plan
        carefully and so you can see what we see.
      </P>

      <H2>Stage 2 — imaging and planning</H2>
      <P>
        An implant cannot be planned from a clinical exam alone. We need to
        see the bone underneath. For most single-implant cases this means a
        digital periapical view and a panoramic radiograph. For complex
        cases, multiple missing teeth, or anatomy close to the sinus or
        inferior alveolar nerve, a CBCT scan gives a true three-dimensional
        picture.
        {" "}
        <span>
          <em>
            {"<!-- proof-gap: confirm whether CBCT is performed in-house at Om Sai or referred to a nearby imaging centre -->"}
          </em>
        </span>
      </P>
      <P>
        From those images we plan the position, angle, length and diameter of
        the implant. The position is not chosen for the bone alone — it is
        chosen for the future crown. A crown placed over a poorly positioned
        implant rarely looks or functions well, no matter how skilled the lab.
        We work backwards from the smile, then forwards into the bone.
      </P>
      <P>
        At this point you receive a written, itemised plan and estimate. For
        the cost reasoning behind that estimate, see our{" "}
        <PillarLink
          slug="pricing-guide"
          label="transparent pricing guide"
        />.
      </P>

      <H2>Stage 3 — preparing for surgery day</H2>
      <P>
        A few days before the surgery we will ask you to do a short list of
        things, all of them simple:
      </P>
      <UL>
        <li>
          Eat a normal meal an hour or two before the appointment. You are
          not sedated for routine implant surgery; you do not need to fast.
        </li>
        <li>
          Take your usual medications as normal unless we have told you
          otherwise. If you are on blood thinners, we will have already
          discussed any adjustment with you and your physician.
        </li>
        <li>
          Avoid smoking for at least 24 hours before and ideally for the
          first two weeks after. Smoking is the single largest modifiable risk
          factor for early implant failure.
        </li>
        <li>
          Arrange for someone to drive you home only if you have asked for
          oral sedation. With routine local anaesthesia alone, most patients
          drive themselves.
        </li>
      </UL>

      <H2>Stage 4 — the surgery itself</H2>
      <P>
        The procedure typically takes between 45 and 90 minutes for a single
        implant. The area is numbed with local anaesthesia. A small incision
        is made in the gum to expose the bone, the bone is gently shaped to
        the planned diameter with a series of precise drills under copious
        irrigation, and the implant fixture is placed by hand and torqued to
        a measured stability. A cover screw or healing abutment is fitted,
        and the gum is sutured around it.
      </P>
      <P>
        You feel pressure during the drilling but not pain. The most common
        comment patients make afterwards is that it took less time and felt
        less invasive than they expected. The surgical site is checked, you
        receive written aftercare, and you go home the same day.
      </P>

      <Pull>
        Modern anaesthesia keeps you comfortable during the procedure. Mild
        soreness in the days that follow is normal and expected.
      </Pull>

      <H2>Stage 5 — the first week</H2>
      <P>
        The first 48 hours are the most important for healing. We ask you to:
      </P>
      <UL>
        <li>
          Bite gently on the gauze pad for 30 to 45 minutes after you leave
          to control oozing.
        </li>
        <li>
          Use cold compresses on the cheek for the first day to limit
          swelling.
        </li>
        <li>
          Stick to soft, cool foods for two to three days. Yoghurt, dal,
          khichdi, soft eggs, mashed potatoes. Avoid hot tea and hot soups
          for the first day.
        </li>
        <li>
          Take the painkillers and any prescribed antibiotics exactly as
          written. Most patients use simple analgesics for three to four
          days.
        </li>
        <li>
          Brush the rest of your mouth gently. Avoid the surgical site for
          the first few days, then resume gentle cleaning around it.
        </li>
      </UL>
      <P>
        Sutures are removed at roughly seven to ten days. We see you for a
        review at that visit and confirm that the soft tissue is healing as
        expected.
      </P>

      <H2>Stage 6 — the healing window (osseointegration)</H2>
      <P>
        This is the longest stage and the one that surprises patients most.
        After the surgical wound has closed, the implant looks settled — but
        underneath, the bone is slowly fusing to the titanium surface. This
        process is called osseointegration, and it cannot be hurried. For
        the lower jaw we typically wait two to three months. For the upper
        jaw, three to four. If a graft was placed, longer still.
      </P>
      <P>
        During this window you can eat, work, and exercise as normal. You
        are not in treatment in any active sense; you are healing. We may
        ask you to come back for a quick mid-window check, but otherwise we
        leave the implant alone and let biology do its work.
      </P>

      <H2>Stage 7 — the abutment</H2>
      <P>
        Once the implant is fully integrated, we move to the abutment stage.
        The abutment is the connector that sits between the implant fixture
        below the gum and the crown above it. For an implant placed with a
        healing abutment from day one, this stage is little more than
        confirming the gum has shaped itself well and taking impressions.
        For an implant placed with a cover screw, a small second procedure
        uncovers it and fits the healing abutment for a couple of weeks
        before impressions.
      </P>
      <P>
        Impressions today are usually digital — an intra-oral scanner
        captures the shape of the gum and the position of the implant in
        about ten minutes.
        {" "}
        <span>
          <em>
            {"<!-- proof-gap: confirm whether Om Sai uses an intra-oral scanner or conventional silicone impressions -->"}
          </em>
        </span>
      </P>

      <H2>Stage 8 — the crown</H2>
      <P>
        From the impression, a dental laboratory builds your final crown.
        Most commonly we choose monolithic zirconia for back teeth (strong,
        biocompatible, low chipping risk) and either zirconia or a layered
        ceramic for front teeth. The lab work takes one to two weeks.
      </P>
      <P>
        On the fit day, we try the crown in, check the contact points with
        neighbouring teeth, adjust the bite carefully, and fit it either by
        screw or by cement. The whole appointment usually takes 30 to 45
        minutes. You leave with a tooth in place and a small tube of
        interdental brushes to use around it.
      </P>

      <H2>Stage 9 — life after the implant</H2>
      <P>
        Implants do not get cavities, but they can still get gum disease
        around them — a condition called peri-implantitis. The single most
        important habit is daily cleaning under and around the crown with a
        small interdental brush. We see you at the three-month and
        twelve-month marks for a periodontal check, and annually after that.
      </P>
      <P>
        If you ever notice bleeding, soreness, or a change in how the
        implant feels, call us. Early intervention on gum issues around an
        implant is straightforward. Late intervention is not.
      </P>
      <P>
        For most patients, day-to-day life with an implant is
        unremarkable in the kindest way — they chew comfortably on
        both sides, stop avoiding particular foods, and gradually
        forget the implant is there. That quiet ordinariness is the
        outcome we are aiming for.
      </P>

      <H2>How long does the whole journey take?</H2>
      <P>
        For a routine single implant in the lower jaw, with healthy bone:
        roughly three to four months from assessment to crown. For the upper
        jaw: roughly four to six months. If grafting or a sinus lift is
        required first, add another three to six months. We map the timeline
        out for you at the planning stage so you can plan work, travel and
        family events around it.
      </P>

      <H2>Eating, speaking, and working through the process</H2>
      <P>
        One of the most common concerns patients raise is whether they
        will be able to eat, speak in meetings, or face their family
        across the dinner table during the months between surgery and
        crown. For a back tooth, the gap is rarely visible and most
        patients carry on normally from the day after surgery, simply
        avoiding the surgical side for chewing for the first week. For a
        front tooth, we plan ahead — a temporary tooth, often a small
        bonded restoration or a discreet removable appliance, is fitted
        so you are never seen without a tooth in place.
      </P>
      <P>
        Speaking is briefly affected for a day or two after surgery
        because of swelling, then returns to normal. Most patients are
        back at work the next day for a desk job, or after two days for
        more physical work. We give you a written note for your employer
        if you need one.
      </P>

      <H2>What raises the risk of an implant failing</H2>
      <P>
        An implant is a small, durable piece of engineering — but it
        lives in a biological environment, and a few patient factors
        influence how well it integrates and survives:
      </P>
      <UL>
        <li>
          <strong>Smoking.</strong> Smokers are several times more
          likely to lose an implant in the first year. We strongly
          encourage stopping at least two weeks before surgery and
          remaining off cigarettes through the integration window.
        </li>
        <li>
          <strong>Uncontrolled diabetes.</strong> Healing is impaired
          when HbA1c is high. We sometimes ask for a recent HbA1c result
          and may delay surgery until it is in a safer range.
        </li>
        <li>
          <strong>Untreated gum disease.</strong> Placing an implant in
          a mouth with active periodontitis is asking it to fail. The
          gum disease is treated first; the implant follows.
        </li>
        <li>
          <strong>Grinding and clenching.</strong> Heavy bruxism puts
          unusual lateral loads on an implant. A simple night guard at
          the crown stage protects the work.
        </li>
        <li>
          <strong>Inconsistent hygiene around the implant.</strong> The
          single largest cause of late implant loss is peri-implantitis,
          and it is almost always preventable with daily interdental
          cleaning.
        </li>
      </UL>

      <H2>Patient questions we hear most often</H2>
      <H3>Is the surgery painful?</H3>
      <P>
        The surgery itself is not painful — local anaesthesia handles
        that comfortably. The first 24 to 48 hours afterwards feel like
        a dull bruise rather than a sharp pain, and simple analgesics
        manage it well. Most patients are surprised by how mild the
        recovery is.
      </P>
      <H3>Can I have all the work done in one visit?</H3>
      <P>
        Occasionally yes — in selected cases with good bone, an implant
        can be placed and a temporary crown fitted on the same day.
        This is the exception rather than the rule, and it requires
        very specific anatomy. We will tell you honestly whether your
        case suits an immediate approach.
      </P>
      <H3>How long will the implant last?</H3>
      <P>
        Well-placed implants in patients with good gum care have
        excellent long-term records — many remain in function for
        decades. We avoid quoting a single survival percentage because
        the literature varies by system, follow-up length, and patient
        factors. What we will commit to is reviewing your implant
        annually and acting quickly if anything changes.
      </P>

      <H2>When an implant is not the right answer</H2>
      <P>
        Part of being a specialist is being willing to say no. A bridge may
        suit you better if neighbouring teeth already need crowns. A
        well-made partial denture may be the right step if multiple teeth
        are missing and budget is the deciding factor. Sometimes the right
        answer is to fix the gum disease first and revisit the implant
        question in six months. We will tell you honestly which option fits
        your case — including the ones that are not implants.
      </P>
      <P>
        Concerned about gum health before you start an implant case? Read{" "}
        <PillarLink
          slug="gum-disease"
          label="our guide to gum disease treatment"
        />. Wondering what your case will cost? The{" "}
        <PillarLink
          slug="pricing-guide"
          label="transparent pricing guide"
        />{" "}
        is the next step.
      </P>
    </>
  );
}

/* ---------------- 3. Gum disease treatment Dharan (Gum Health) ~1500w ---------------- */

function GumDiseaseTreatmentBody() {
  return (
    <>
      <P>
        Gum disease is the single most common reason adults lose teeth in
        Nepal and across South Asia — more than decay, more than trauma. It
        is also one of the most treatable conditions in dentistry when it is
        caught early. The difficulty is that it rarely hurts in its early
        stages, which is why so many patients only seek help once a tooth
        has already started to wobble. This guide explains what gum disease
        actually is, how it progresses, the staged treatment we offer at Om
        Sai Dental Implant Center in Dharan, and what you can reasonably
        expect from care.
      </P>

      <H2>What gum disease actually is</H2>
      <P>
        Gum disease begins as a reaction to bacteria. A thin layer of
        bacterial plaque is constantly forming along the gum margin. If it
        is removed daily by brushing and flossing, the gums stay healthy. If
        plaque is left in place, it hardens into calculus (tartar) within a
        few days. Calculus is rough, holds more bacteria, and irritates the
        gum. The body responds with inflammation — that is gingivitis.
      </P>
      <P>
        Gingivitis is reversible. Left untreated, however, the inflammation
        starts to damage the fibres and bone that anchor the tooth in its
        socket. The gum pulls away, forming a pocket; the pocket harbours
        more bacteria; the bone recedes further. That is periodontitis, and
        the bone loss it causes is not reversible — only stoppable.
      </P>

      <H2>Why it matters beyond the mouth</H2>
      <P>
        Periodontitis is no longer thought of as a purely oral problem. It
        is associated with poorly controlled diabetes, with cardiovascular
        disease, and with adverse outcomes in pregnancy. Treating gum
        disease is not only about saving teeth — it is part of looking after
        the rest of you. Patients with diabetes in particular often find
        their blood sugar becomes easier to control once active periodontal
        infection is brought under control.
      </P>

      <H2>The common causes</H2>
      <UL>
        <li>
          <strong>Inconsistent cleaning.</strong> The single biggest factor.
          Brushing twice a day is necessary; cleaning between the teeth once
          a day is what most people skip.
        </li>
        <li>
          <strong>Smoking and tobacco chewing.</strong> Smoking masks early
          bleeding, accelerates bone loss, and dramatically worsens
          treatment outcomes.
        </li>
        <li>
          <strong>Uncontrolled diabetes.</strong> High blood sugar both
          feeds the bacteria and impairs the body&apos;s healing response.
        </li>
        <li>
          <strong>Family history.</strong> Susceptibility runs in families.
          If a parent lost teeth early to gum disease, take it seriously.
        </li>
        <li>
          <strong>Stress and hormonal change.</strong> Pregnancy and
          menopause can accelerate gum inflammation that was previously
          quiet.
        </li>
      </UL>

      <H2>The symptoms patients notice (and the ones they miss)</H2>
      <P>
        Most patients only seek help once they notice a problem. The trouble
        is that gum disease is quiet for a long time before it becomes
        noisy. The early signs worth acting on include:
      </P>
      <UL>
        <li>Pink-tinged toothpaste after brushing — bleeding gums.</li>
        <li>Bad breath that does not clear with brushing.</li>
        <li>Gums that look red and puffy rather than firm and pink.</li>
        <li>Teeth that look longer than they used to — gum recession.</li>
        <li>A feeling that food gets trapped where it never used to.</li>
      </UL>
      <P>
        Pain, mobility, and pus are late signs, not early ones. If you have
        any of them, please book a consultation rather than wait. For a
        fuller list, see{" "}
        <Link
          href="/journal/signs-of-gum-disease"
          className="underline decoration-[var(--brass)]/50 underline-offset-4 hover:decoration-foreground"
        >
          the signs of gum disease guide
        </Link>
        .
      </P>

      <H2>How a periodontist makes the diagnosis</H2>
      <P>
        A consultant periodontist diagnoses gum disease using a periodontal
        chart. We use a fine probe to measure the depth of the gum cuff
        around each tooth at six points. Healthy pockets are one to three
        millimetres deep and do not bleed on probing. Pockets that bleed
        with depths of four millimetres or more indicate active disease.
        Radiographs are then used to measure the bone level around each
        root.
      </P>
      <P>
        The chart and the radiographs together give us a staged diagnosis —
        gingivitis, early, moderate, or advanced periodontitis. The stage
        determines the care plan.
      </P>

      <Pull>
        Treatment is not one procedure. It is a sequence — and the first
        step is almost always the same: clean thoroughly, then re-assess.
      </Pull>

      <H2>Stage 1 — non-surgical periodontal therapy</H2>
      <P>
        Most patients begin and end here. Non-surgical therapy means a
        professional cleaning that goes beneath the gum line to remove
        calculus from the root surface. It is performed with ultrasonic
        instruments and fine hand scalers, with local anaesthesia when the
        pockets are deep. We usually divide the mouth into quadrants and
        treat them over two to four visits.
      </P>
      <P>
        At the same time we teach you a cleaning routine that actually fits
        your mouth — the right brush angle, the right interdental brush
        size, and the right frequency. Without that, the cleaning we do in
        the chair will not last.
      </P>

      <H2>Stage 2 — re-assessment at six to eight weeks</H2>
      <P>
        We do not commit to surgery before we have given the tissue a
        chance to respond. Six to eight weeks after non-surgical therapy we
        re-chart the pockets. In most patients, pockets reduce and bleeding
        clears. If they have, we move you onto a maintenance schedule. If
        certain sites have not responded, we plan the next step
        specifically for those sites.
      </P>

      <H2>Stage 3 — periodontal surgery, only where needed</H2>
      <P>
        Where pockets remain deep after non-surgical therapy, we may
        recommend a small flap procedure. The gum is gently lifted to give
        direct access to the root surface, calculus is removed under direct
        vision, and the gum is repositioned and sutured. In selected cases
        a regenerative material can be placed to encourage some bone
        regrowth around the tooth.
      </P>
      <P>
        Surgery is not the default. It is reserved for sites that have not
        healed by less invasive means. A periodontist&apos;s job is partly to
        protect you from surgery you do not need.
      </P>

      <H2>Home care that actually works</H2>
      <P>
        Professional treatment, however thorough, accounts for a small
        fraction of the year. The rest of the work happens at home. A
        few practical principles consistently separate patients who
        stay stable from patients who do not:
      </P>
      <UL>
        <li>
          <strong>Brush for two full minutes, twice a day.</strong> Use
          a soft brush and a 45-degree angle towards the gum margin. An
          electric brush makes the technique easier for most adults but
          is not essential.
        </li>
        <li>
          <strong>Clean between the teeth every night.</strong> Floss is
          fine for tight contacts; interdental brushes are far more
          effective wherever there is space for one. We size them for
          you in the chair.
        </li>
        <li>
          <strong>Skip the abrasive whitening toothpastes.</strong> They
          accelerate recession on already-thin gum tissue. A standard
          fluoride toothpaste is enough.
        </li>
        <li>
          <strong>Rinse only when prescribed.</strong> Chlorhexidine
          mouthwash is a short-term tool, not a daily habit — extended
          use stains teeth and shifts the oral flora.
        </li>
      </UL>

      <H2>What makes a periodontist different</H2>
      <P>
        A general dentist treats the whole mouth; a periodontist
        specialises in the supporting structures — the gum, the bone,
        the ligament around each root. The training is a three-year
        Master of Dental Surgery (MDS) on top of the general dental
        degree, focused on the diagnosis and surgical management of
        periodontal disease, gum aesthetics, and dental implants.
      </P>
      <P>
        In practice the difference shows up in three places: a more
        detailed periodontal chart, a willingness to treat in stages
        rather than rush to extraction, and the ability to perform
        regenerative and surgical procedures in-house when they are
        genuinely needed. Dr. Ajit Yadav holds an MDS in Periodontology
        and lectures at Nobel Medical College, Biratnagar — the same
        protocols he uses with patients are the ones he teaches.
      </P>

      <H2>Stage 4 — supportive periodontal care</H2>
      <P>
        Gum disease is a chronic condition. Once treated, the bacterial
        cause is still present and the tissue remains vulnerable. We see
        you for supportive periodontal care every three or four months in
        the first year, and then settle into a longer interval if the
        tissue stays stable. Patients who stick to the maintenance
        programme almost always keep their teeth. Patients who do not, do
        not.
      </P>
      <P>
        A supportive visit is not a repeat of the full treatment. It is
        a short, focused appointment — re-charting the pockets we are
        watching, removing any new calculus from below the gum line in
        the sites that need it, and a reminder of the home-care
        techniques that fit your mouth. Most maintenance visits take
        under an hour, and most patients describe them as a relief
        rather than a chore.
      </P>

      <H2>What about teeth that cannot be saved?</H2>
      <P>
        Sometimes the bone loss is too advanced for a tooth to be a useful
        long-term anchor. In those cases we discuss extraction and
        replacement honestly. A dental implant can be an excellent answer
        — but only once the surrounding tissue is healthy. We will not
        place an implant in a mouth with active periodontitis. For the
        full implant journey, see{" "}
        <PillarLink slug="implants" label="our implant procedure guide" />.
      </P>

      <H2>What we will not promise</H2>
      <P>
        We will not promise a percentage success rate. The honest answer is
        that outcomes depend heavily on how consistent your home care is,
        whether you smoke, and whether systemic conditions like diabetes
        are controlled. What we can promise is that we will diagnose
        carefully, treat in stages, and tell you exactly where you stand
        at each review.
      </P>

      <P>
        Worried about cost? The{" "}
        <PillarLink
          slug="pricing-guide"
          label="transparent pricing guide"
        />{" "}
        explains how periodontal estimates are structured. Want a fuller
        list of warning signs to look for in yourself or a family member?
        Read{" "}
        <Link
          href="/journal/signs-of-gum-disease"
          className="underline decoration-[var(--brass)]/50 underline-offset-4 hover:decoration-foreground"
        >
          signs of gum disease you should never ignore
        </Link>
        .
      </P>
    </>
  );
}

/* ---------------- 4. Signs of gum disease (Gum Health) ~1000w ---------------- */

function SignsOfGumDiseaseBody() {
  return (
    <>
      <P>
        Gum disease almost never announces itself. It does not throb. It
        does not wake you up. By the time a tooth feels loose, the
        underlying bone has already lost a significant portion of its
        support. The good news is that gum disease leaves a trail of
        smaller signs long before that point — and if you know what to
        look for, you can act early, when the condition is straightforward
        to treat. Here are eight signs a consultant periodontist would
        rather you noticed yourself than have to point out.
      </P>

      <H2>1. Pink toothpaste in the sink</H2>
      <P>
        Healthy gums do not bleed when you brush them, full stop. If your
        toothpaste comes out pink-tinged most days, that is not a brushing
        injury — it is inflammation. The most common cause is plaque sitting
        at the gum line, irritating the tissue. Inflammation that has been
        present for weeks is gingivitis; left longer, it begins to damage
        the deeper attachment around the root.
      </P>
      <P>
        Many patients respond to bleeding by brushing less, on the
        assumption that they must be brushing too hard. That makes the
        problem worse. The right response is to brush more gently and more
        thoroughly, clean between the teeth daily, and book a check-up.
      </P>

      <H2>2. Bad breath that does not clear</H2>
      <P>
        Morning breath that disappears after brushing is normal. Bad breath
        that lingers through the day, even after cleaning, often comes from
        the same bacteria that drive gum disease — anaerobic species
        producing volatile sulphur compounds beneath the gum line. Mouthwash
        masks it for an hour. Removing the bacterial source treats it.
      </P>

      <H2>3. Gums that look different from how they used to</H2>
      <P>
        Healthy gum tissue is firm, pale pink (or naturally pigmented for
        many patients), and tightly stippled like an orange peel. Inflamed
        tissue looks red, shiny, and puffy along the margin. Stand in front
        of a mirror in good light and compare the margin of one tooth to
        another. If you can see a clear difference, the redder area is
        usually where disease is starting.
      </P>

      <H2>4. Teeth that look longer than they used to</H2>
      <P>
        Recession is the gum line moving away from the crown, exposing more
        of the root. It is often gradual enough that patients only notice
        it from an old photograph or because a tooth has become sensitive
        to cold. Recession can be a sign of periodontal bone loss, of
        forceful brushing, or both. A periodontist can tell you which is
        driving it in your case and whether the recession is stable or
        progressing.
      </P>

      <H2>5. Food getting trapped where it never used to</H2>
      <P>
        Healthy teeth meet their neighbours with a tight contact at the
        chewing surface and a gentle support of gum tissue underneath.
        When bone is lost between two teeth, a small triangular space
        opens up — patients describe it as food getting stuck after every
        meal. That space is called a black triangle, and it is a
        late-warning sign of interproximal bone loss.
      </P>

      <Pull>
        Food impaction is rarely just an annoyance. It is usually the
        first thing patients can see for themselves.
      </Pull>

      <H2>6. A tooth that feels different when you bite</H2>
      <P>
        Mobility — a tooth that wobbles slightly when you push it with
        your tongue, or feels different under the bite of a hard
        chapati — is a sign that the bone support has dropped below a
        threshold. Mobility is not always recoverable, but the rate of
        further loss can often be slowed dramatically with treatment.
        Please do not wait to see if it settles.
      </P>

      <H2>7. A bad taste, especially on waking</H2>
      <P>
        A persistent metallic or unpleasant taste, particularly first
        thing in the morning, sometimes comes from pus draining from a
        periodontal pocket. It is uncomfortable to read about and
        uncomfortable to admit to, but it is a clear signal to be seen
        soon rather than later.
      </P>

      <H2>8. A family history you have been ignoring</H2>
      <P>
        If a parent lost teeth early to gum disease, your susceptibility
        is higher than average. You may have none of the other seven
        signs yet and still benefit from a baseline periodontal chart in
        your thirties. Family history is not destiny — but it is a
        reason to be assessed earlier rather than later.
      </P>
      <P>
        Two other risk markers worth mentioning, even when no symptom
        is yet visible: a long history of smoking or tobacco chewing,
        and a diagnosis of diabetes. Both quietly accelerate gum
        disease for years before the gums themselves give a clear
        signal. If either applies to you, a periodontal check every
        twelve months is a reasonable habit even when nothing feels
        wrong.
      </P>

      <H2>Common questions about acting on these signs</H2>
      <H3>Should I wait until my next routine check-up?</H3>
      <P>
        If you have noticed two or more of the signs above, no — book
        a periodontal assessment rather than wait. Gum disease
        progresses quietly; the cost in time and treatment is much
        smaller when it is caught at the gingivitis stage than at the
        moderate-periodontitis stage.
      </P>
      <H3>Can I treat it at home with mouthwash?</H3>
      <P>
        Mouthwash can mask symptoms briefly but it does not remove the
        calculus that drives the inflammation. The calculus has to be
        removed mechanically — that is the part you cannot do
        yourself, however careful your home routine.
      </P>
      <H3>I am pregnant. Is it safe to be seen?</H3>
      <P>
        Yes. A non-surgical periodontal cleaning in the second
        trimester is safe and is actively recommended when bleeding is
        present, because untreated periodontal infection is associated
        with adverse pregnancy outcomes. Tell us at the booking stage
        so we can plan the visit appropriately.
      </P>

      <H2>What to do if you noticed yourself in this list</H2>
      <P>
        Book a periodontal assessment. Bring any recent dental
        radiographs and a short list of your current medications. A
        chart of the gum pockets and a couple of radiographs are enough
        to give you a clear, staged picture. Most patients leave the
        first visit reassured — the earlier you come, the more
        straightforward the plan.
      </P>
      <P>
        For a fuller explanation of the treatment options that follow,
        read{" "}
        <PillarLink
          slug="gum-disease"
          label="gum disease treatment in Dharan"
        />. If you are also weighing whether a missing tooth might be
        replaced by an implant, the{" "}
        <PillarLink slug="implants" label="implant procedure guide" />{" "}
        is the next step.
      </P>
    </>
  );
}

export const BODIES: Record<BodyKey, () => ReactNode> = {
  "implant-cost-dharan": ImplantCostBody,
  "implant-procedure-steps": ImplantProcedureBody,
  "gum-disease-treatment-dharan": GumDiseaseTreatmentBody,
  "signs-of-gum-disease": SignsOfGumDiseaseBody,
};
