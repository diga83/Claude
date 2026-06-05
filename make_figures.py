#!/usr/bin/env python3
# Generates four journal figures for the Lorem ipsum narrative review.
import os, cairosvg

OUT = "figures"
os.makedirs(OUT, exist_ok=True)

INK="#1d1d1f"; NAVY="#2E5A88"; LFILL="#eef3f9"; BORDER="#c4d0de"
GREY="#6b7280"; GREEN="#2f7d4f"; GFILL="#e6f2ea"; RED="#b23b3b"; RFILL="#f7e6e6"
GHOST="#9aa1a8"; GHFILL="#eef0f2"; GOLD="#9a7a1f"; GLDFILL="#f6efda"
FONT="DejaVu Sans, Arial, Helvetica, sans-serif"

DEFS = f'''<defs>
<marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
  <path d="M0,0 L10,5 L0,10 z" fill="{INK}"/>
</marker>
<marker id="arrn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
  <path d="M0,0 L10,5 L0,10 z" fill="{NAVY}"/>
</marker>
</defs>'''

def esc(s): return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

def text(x,y,s,size=15,fill=INK,anchor="start",weight="normal",style="normal",ff=FONT):
    return (f'<text x="{x}" y="{y}" font-family="{ff}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" font-weight="{weight}" font-style="{style}">{esc(s)}</text>')

def lines(x,y,arr,size=14,fill=INK,anchor="middle",lh=18,weight="normal",style="normal"):
    return "".join(text(x,y+i*lh,s,size,fill,anchor,weight,style) for i,s in enumerate(arr))

def box(x,y,w,h,fill=LFILL,stroke=BORDER,rx=10,sw=1.5):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" ry="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

def save(name, vw, vh, body, scale=2):
    svg=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" '
         f'width="{vw}" height="{vh}">{DEFS}<rect width="{vw}" height="{vh}" fill="#ffffff"/>{body}</svg>')
    p_svg=os.path.join(OUT,name+".svg"); open(p_svg,"w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=os.path.join(OUT,name+".png"),
                     output_width=vw*scale, output_height=vh*scale)
    print("wrote", name, f"({vw}x{vh})")

# ---------------------------------------------------------------- Figure 1: methods workflow
def fig_methods():
    vw,vh=1240,430; b=[]
    steps=[("1. Scope",["Decompose the question","into five search angles"]),
           ("2. Search",["Five agents query","the web in parallel"]),
           ("3. Fetch & extract",["De-duplicate sources;","extract falsifiable claims"]),
           ("4. Verify",["Adversarial vote; claims","failing 2 / 3 are dropped"]),
           ("5. Synthesise",["Merge, rank by confidence,","cite by source tier"])]
    bw,bh,gap,x0,y0=216,128,28,14,40
    for i,(t,sub) in enumerate(steps):
        x=x0+i*(bw+gap)
        fill = GFILL if i==3 else LFILL
        stroke = GREEN if i==3 else NAVY
        b.append(box(x,y0,bw,bh,fill,stroke,12,2))
        b.append(text(x+bw/2,y0+34,t,18,INK,"middle","bold"))
        b.append(lines(x+bw/2,y0+64,sub,14,GREY,"middle",19))
        if i<4:
            xa=x+bw+4; b.append(f'<line x1="{xa}" y1="{y0+bh/2}" x2="{xa+gap-6}" y2="{y0+bh/2}" stroke="{INK}" stroke-width="2" marker-end="url(#arr)"/>')
    # angle band
    by=240
    b.append(text(x0,by-6,"Search fans out across five angles:",13,GREY,"start","bold"))
    angles=["Classical sources","Philology","Design history","HCI / UX","Incidents"]
    cw,cg=226,12
    for i,a in enumerate(angles):
        x=x0+i*(cw+cg)
        b.append(box(x,by,cw,40,"#f7f9fc",BORDER,20,1.2))
        b.append(text(x+cw/2,by+25,a,14,NAVY,"middle","bold"))
    # connector from band to step 2
    sx=x0+(cw+cg)*1+cw/2
    b.append(f'<line x1="{sx}" y1="{by}" x2="{x0+1*(bw+gap)+bw/2}" y2="{y0+bh+2}" stroke="{NAVY}" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#arrn)"/>')
    # tier legend
    ly=330
    b.append(box(x0,ly,vw-2*x0,64,"#fbfcfe",BORDER,10,1.2))
    b.append(text(x0+18,ly+25,"Source-quality tiers (applied in synthesis):",13,INK,"start","bold"))
    tiers=["primary text","peer-reviewed","standards body","reputable press","vendor / grey lit."]
    tx=x0+18
    for i,t in enumerate(tiers):
        b.append(f'<circle cx="{tx+8}" cy="{ly+47}" r="5" fill="{NAVY}" opacity="{1-0.13*i}"/>')
        b.append(text(tx+20,ly+51,t,13,GREY,"start"))
        tx+=20+ (len(t)*7.3) + 26
    save("fig1_methods",vw,vh,"".join(b))

# ---------------------------------------------------------------- Figure 2: corruption mechanism
def fig_corruption():
    vw,vh=1200,540; b=[]; Lx=40; SF="DejaVu Serif, Georgia, serif"
    def sw(s,size,bold): return len(s)*(size*0.66 if bold else size*0.57)
    # Band A original
    b.append(text(Lx,40,"A   Cicero, De finibus 1.10.32 (original Latin)",16,INK,"start","bold"))
    b.append(box(Lx,54,vw-2*Lx,72,"#fbfcfe",BORDER,10,1.4))
    x=Lx+18; y=88
    pre="… neque porro quisquam est, qui "
    b.append(text(x,y,pre,17,INK,"start",ff=SF)); x+=sw(pre,17,False)
    g="dolorem ipsum dolor sit amet, consectetur"; gw=sw(g,17,True)+24
    b.append(f'<rect x="{x}" y="{y-23}" width="{gw}" height="33" rx="6" fill="{GFILL}" stroke="{GREEN}" stroke-width="1.2"/>')
    b.append(text(x+12,y,g,17,GREEN,"start","bold",ff=SF)); x+=gw+8
    b.append(text(x,y,", adipisci velit …",17,INK,"start",ff=SF))
    b.append(text(Lx+18,116,"“Nor is there anyone who desires pain itself because it is pain …”",13,GREY,"start","normal","italic"))
    b.append(f'<line x1="{vw/2}" y1="132" x2="{vw/2}" y2="166" stroke="{INK}" stroke-width="2" marker-end="url(#arr)"/>')
    # Band B page break
    b.append(text(Lx,196,"B   1914 Loeb edition — word split at a page break",16,INK,"start","bold"))
    b.append(box(Lx,210,vw-2*Lx,96,"#fbfcfe",BORDER,10,1.4))
    x=Lx+18; y=252
    p1="page 36 ends … quia "
    b.append(text(x,y,p1,16,INK,"start",ff=SF)); x+=sw(p1,16,False)
    dw=sw("do",16,True)+22
    b.append(f'<rect x="{x}" y="{y-23}" width="{dw}" height="32" rx="5" fill="{RFILL}" stroke="{RED}" stroke-width="1.1"/>')
    b.append(text(x+11,y,"do",16,RED,"start","bold",ff=SF)); x+=dw
    pbx=x+8
    b.append(f'<line x1="{pbx}" y1="224" x2="{pbx}" y2="292" stroke="{RED}" stroke-width="2" stroke-dasharray="6 4"/>')
    b.append(text(pbx,300,"page break",11,RED,"middle","bold"))
    b.append(text(pbx+12,y,"lorem ipsum dolor sit amet, consectetur … (p. 37)",16,INK,"start",ff=SF))
    b.append(text(Lx+18,290,"leading “Do-” of dolorem is lost → the filler begins mid-word at “lorem”",13,GREY,"start","normal","italic"))
    b.append(f'<line x1="{vw/2}" y1="312" x2="{vw/2}" y2="346" stroke="{INK}" stroke-width="2" marker-end="url(#arr)"/>')
    # Band C corrupted
    b.append(text(Lx,376,"C   Standard placeholder (corrupted, non-grammatical Latin)",16,INK,"start","bold"))
    b.append(box(Lx,390,vw-2*Lx,80,"#fbfcfe",BORDER,10,1.4))
    y=436; x=Lx+16
    toks=[("Lorem ipsum dolor sit amet, consectetur","g"),("adipiscing","r"),
          (" elit, sed do ","n"),("eiusmod","r"),(" tempor ","n"),("incididunt","r"),(" …","n")]
    for s,k in toks:
        if k=="n":
            b.append(text(x,y,s,16,INK,"start","normal",ff=SF)); x+=sw(s,16,False)+2
        else:
            col,fil=(GREEN,GFILL) if k=="g" else (RED,RFILL)
            w=sw(s,16,True)+22
            b.append(f'<rect x="{x}" y="{y-23}" width="{w}" height="32" rx="6" fill="{fil}" stroke="{col}" stroke-width="1.1"/>')
            b.append(text(x+11,y,s,16,col,"start","bold",ff=SF)); x+=w+10
    # legend
    ly=498
    b.append(f'<rect x="{Lx}" y="{ly}" width="22" height="14" rx="3" fill="{GFILL}" stroke="{GREEN}"/>'); b.append(text(Lx+30,ly+12,"retained Ciceronian fragment",13,GREY,"start"))
    b.append(f'<rect x="{Lx+300}" y="{ly}" width="22" height="14" rx="3" fill="{RFILL}" stroke="{RED}"/>'); b.append(text(Lx+330,ly+12,"non-existent / altered Latin",13,GREY,"start"))
    b.append(f'<line x1="{Lx+580}" y1="{ly+7}" x2="{Lx+610}" y2="{ly+7}" stroke="{RED}" stroke-width="2" stroke-dasharray="6 4"/>'); b.append(text(Lx+618,ly+12,"1914 page break (terminus post quem)",13,GREY,"start"))
    save("fig2_corruption",vw,vh,"".join(b))

# ---------------------------------------------------------------- Figure 3: transmission timeline
def fig_timeline():
    vw,vh=1200,470; b=[]
    ax_y=250; x0=125; x1=1120
    b.append(f'<line x1="{x0}" y1="{ax_y}" x2="{x1}" y2="{ax_y}" stroke="{INK}" stroke-width="2.5" marker-end="url(#arr)"/>')
    b.append(text(x1,ax_y+34,"not to scale",11,GREY,"end","normal","italic"))
    nodes=[("45 BCE",["Cicero, De finibus","1.10.32–33 (Torquatus,","Epicurean argument)"],True),
           ("1914",["Rackham Loeb","translation; page-break","truncation → “Lorem”"],False),
           ("1966",["Letraset “Body Type”","dry-transfer sheets","(earliest attested use)"],True),
           ("1985",["Aldus PageMaker →","desktop publishing"],False),
           ("1994",["McClintock identifies","source via “consectetur”"],True),
           ("2014",["Google Translate","anomaly (MT artifact)"],False),
           ("present",["Web / CMS","default filler"],True)]
    n=len(nodes); step=(x1-60-x0)/(n-1)
    for i,(yr,lab,above) in enumerate(nodes):
        x=x0+i*step
        b.append(f'<circle cx="{x}" cy="{ax_y}" r="8" fill="{NAVY}"/>')
        b.append(text(x,ax_y+ (-22 if above else 30) ,yr,16,NAVY,"middle","bold"))
        ly = ax_y-44-len(lab)*16 if above else ax_y+46
        # connector tick
        b.append(f'<line x1="{x}" y1="{ax_y}" x2="{x}" y2="{ly-6 if above else ly-14}" stroke="{BORDER}" stroke-width="1.2"/>')
        b.append(lines(x, ly if above else ly, lab, 12.5, INK, "middle", 16))
    # ghost myth callout
    gx,gy=150,40
    b.append(f'<rect x="{gx}" y="{gy}" width="430" height="58" rx="10" fill="{GHFILL}" stroke="{GHOST}" stroke-width="1.5" stroke-dasharray="7 4"/>')
    b.append(text(gx+16,gy+24,"“In use since the 1500s”",14,GHOST,"start","bold"))
    b.append(text(gx+16,gy+44,"unverified conjecture — no specimen exists (Slate, 2023)",12.5,GHOST,"start","normal","italic"))
    b.append(text(gx+405,gy+30,"✗",22,RED,"middle","bold"))
    save("fig3_timeline",vw,vh,"".join(b))

# ---------------------------------------------------------------- Figure 4: interdisciplinary map
def fig_map():
    vw,vh=1200,700; b=[]
    cx,cy=600,300
    # hub
    b.append(f'<ellipse cx="{cx}" cy="{cy}" rx="150" ry="60" fill="{NAVY}"/>')
    b.append(text(cx,cy-6,"Lorem ipsum",21,"#ffffff","middle","bold"))
    b.append(text(cx,cy+18,"pseudo-Latin placeholder",13,"#dce6f2","middle"))
    lenses=[(300,70,"Classical reception",["• Cicero, De finibus (45 BCE)",
            "• Epicurean doctrine (Torquatus)","• pseudo-Latin corruption"],GREEN,GFILL),
            (55,455,"Design history",["• greeking / dummy text","• Letraset (1966)",
            "• desktop publishing (1985)","• global ubiquity"],GOLD,GLDFILL),
            (705,440,"HCI / UX",["• placeholder rationale","• content-first critique",
            "• prototype fidelity","• accessibility & SEO risk","• MT hallucination"],NAVY,LFILL)]
    bw=440
    for (x,y,t,items,col,fill) in lenses:
        bh=44+len(items)*22+10
        # connector to hub
        b.append(f'<line x1="{x+bw/2}" y1="{y+bh/2}" x2="{cx}" y2="{cy}" stroke="{BORDER}" stroke-width="1.6"/>')
    # redraw boxes on top of connectors
    for (x,y,t,items,col,fill) in lenses:
        bh=44+len(items)*22+10
        b.append(box(x,y,bw,bh,fill,col,12,2))
        b.append(text(x+18,y+30,t,17,col,"start","bold"))
        b.append(lines(x+18,y+54,items,14,INK,"start",22))
    # redraw hub on top
    b.append(f'<ellipse cx="{cx}" cy="{cy}" rx="150" ry="60" fill="{NAVY}"/>')
    b.append(text(cx,cy-6,"Lorem ipsum",21,"#ffffff","middle","bold"))
    b.append(text(cx,cy+18,"pseudo-Latin placeholder",13,"#dce6f2","middle"))
    # thesis ribbon
    ry=662
    b.append(box(310,ry,580,32,"#f7f9fc",BORDER,16,1.2))
    b.append(text(cx,ry+21,"Synthesis: an accidental case of classical reception",14,INK,"middle","bold"))
    save("fig4_map",vw,vh,"".join(b))

fig_methods(); fig_corruption(); fig_timeline(); fig_map()
print("done")
