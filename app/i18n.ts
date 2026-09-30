/** Site-wide translations (Portuguese default + English). */

export type Lang = "pt" | "en";

type ToolMeta = { name: string; role: string };
type ProjectMeta = { title: string; category: string; desc: string };

export interface Translation {
  hero: {
    brand: string;
    title: string;
    tagline: string;
    navStart: string;
    navProjects: string;
    navContact: string;
  };
  profile: {
    label: string;
    projectTab: string;
    contactTab: string;
    hello: string;
    aboutMe: string;
    bio: string;
    softwareSkills: string;
    toolStack: string;
    toolStackMobileTitle: string;
    toolStackMobileHint: string;
    toolNo: string;
    clickToDisplace: string;
    stack: string;
    clickToRotate: string;
  };
  tools: Record<string, ToolMeta>;
  projects: {
    label: string;
    contactTab: string;
    recap: string;
    ghost: string;
    watchProject: string;
    swipeHint: string;
    tapToPlay: string;
    prevAria: string;
    nextAria: string;
    projects: ProjectMeta[];
  };
  equipment: {
    label: string;
    profileTab: string;
    projectTab: string;
    subtitle: string;
    description: string;
    annotations: string[];
    items: Array<{ name: string; category: string; description: string }>;
    footer: string;
    footerRight: string;
  };
  contact: {
    label: string;
    profileTab: string;
    projectTab: string;
    contactMe: string;
    name: string;
    role: string;
    instagram: string;
    whatsapp: string;
    thankYou: string;
    letsWork: string;
  };
  modal: {
    projectId: string;
    closeAria: string;
    closeLabel: string;
    closeHint: string;
  };
}

export const translations: Record<Lang, Translation> = {
  pt: {
    // Hero
    hero: {
      brand: "LIVRO DE PORTFÓLIO CINEMATOGRÁFICO",
      title: "PORTFÓLIO",
      tagline: "■ CRIADOR DE CONTEÚDO & EDITOR DE VÍDEO",
      navStart: "INÍCIO",
      navProjects: "PROJETOS",
      navContact: "CONTATO",
    },
    // Profile
    profile: {
      label: "PERFIL",
      projectTab: "PROJETOS",
      contactTab: "CONTATO",
      hello: "OLÁ, EU SOU",
      aboutMe: "SOBRE MIM",
      bio: "Sou Paulo Vieira, videomaker especializado em vídeos imobiliários. Meu objetivo é transformar imóveis em vídeos que valorizam cada detalhe, despertam desejo e ajudam corretores e imobiliárias a gerar mais interesse e oportunidades através do conteúdo.",
      softwareSkills: "FERRAMENTAS DE TRABALHO",
      toolStack: "PILHA DE FERRAMENTAS",
      toolStackMobileTitle: "PILHA DE FERRAMENTAS INTERATIVA",
      toolStackMobileHint: "CLIQUE NO CARD PARA MANIPULAR",
      toolNo: "FERRAMENTA Nº",
      clickToDisplace: "CLIQUE PARA DESLOCAR",
      stack: "PILHA",
      clickToRotate: "CLIQUE PARA ROTACIONAR",
    },
    // Tool cards
    tools: {
      davinci: { name: "DAVINCI RESOLVE", role: "FINALIZAÇÃO DE COR" },
      afterEffects: { name: "AFTER EFFECTS", role: "MOTION DESIGN" },
      premiere: { name: "PREMIERE PRO", role: "EDIÇÃO DE VÍDEO" },
      chatgpt: { name: "CHATGPT", role: "ASSISTENTE IA" },
      kling: { name: "KLING AI", role: "VÍDEO COM IA" },
    },
    // Projects
    projects: {
      label: "PROJETOS",
      contactTab: "CONTATO",
      recap: "RECAP PROJETOS 2025",
      ghost: "PORTFÓLIO",
      watchProject: "ASSISTIR PROJETO",
      swipeHint: "DESLIZE",
      tapToPlay: "TOQUE PARA ASSISTIR",
      prevAria: "Projeto anterior",
      nextAria: "Próximo projeto",
      projects: [
        { title: "PROJETO 01", category: "COMERCIAL / 4K", desc: "Comercial cinematográfico com ritmo dinâmico de câmera e color grading profissional." },
        { title: "PROJETO 02", category: "MOTION DESIGN", desc: "Edição atmosférica com design de som intenso e overlays de efeitos visuais." },
        { title: "PROJETO 03", category: "FORMATO CURTO / TIKTOK", desc: "Edições verticais de alta retenção feitas para redes sociais." },
        { title: "PROJETO 04", category: "DOCUMENTÁRIO", desc: "Narrativa crua capturando momentos humanos autênticos e luz cinematográfica." },
        { title: "PROJETO 05", category: "COMERCIAL / 4K", desc: "Edição imobiliária cinematográfica destacando espaços premium com movimento elegante." },
      ],
    },
    // Equipment
    equipment: {
      label: "EQUIPAMENTOS",
      profileTab: "PERFIL",
      projectTab: "PROJETOS",
      subtitle: "As ferramentas por trás do trabalho",
      description: "Câmera, workstation, som e movimento. Cada ferramenta tem um propósito.",
      annotations: ["01 / CÂMERA", "02 / WORKSTATION", "03 / MICROFONE", "04 / GIMBAL"],
      items: [
        { name: "CÂMERA", category: "Câmera de Cinema", description: "SISTEMA PRINCIPAL DE CÂMERA" },
        { name: "WORKSTATION", category: "Workstation de Edição", description: "PÓS-PRODUÇÃO E FINALIZAÇÃO" },
        { name: "MICROFONE", category: "Microfone Shotgun", description: "ÁUDIO DE LOCAL LIMPO" },
        { name: "GIMBAL", category: "Gimbal de Câmera", description: "MOVIMENTO ESTABILIZADO" },
      ],
      footer: "CONJUNTO DE EQUIPAMENTOS / 04 ITENS",
      footerRight: "COMPOSIÇÃO EM PROFUNDIDADE — EDITORIAL",
    },
    // Contact
    contact: {
      label: "CONTATO",
      profileTab: "PERFIL",
      projectTab: "PROJETOS",
      contactMe: "CONTATO",
      name: "PAULO VIEIRA",
      role: "VIDEOMAKER / EDITOR",
      instagram: "@pvieira.videos",
      whatsapp: "+55 12 98316-0115",
      thankYou: "OBRIGADO",
      letsWork: "VAMOS TRABALHAR JUNTOS",
    },
    // Modal
    modal: {
      projectId: "PROJETO ID:",
      closeAria: "Fechar vídeo",
      closeLabel: "FECHAR",
      closeHint: "CLIQUE FORA PARA FECHAR",
    },
  },

  en: {
    hero: {
      brand: "CINEMATIC PORTFOLIO BOOK",
      title: "PORTFOLIO",
      tagline: "■ CONTENT CREATOR & VIDEO EDITOR",
      navStart: "START",
      navProjects: "PROJECTS",
      navContact: "CONTACT",
    },
    profile: {
      label: "PROFILE",
      projectTab: "PROJECT",
      contactTab: "CONTACT PERSON",
      hello: "HELLO, I AM",
      aboutMe: "ABOUT ME",
      bio: "I'm Paulo Vieira, a videomaker specialized in real estate videos. My goal is to turn properties into videos that highlight every detail, spark desire, and help realtors and agencies generate more interest and opportunities through content.",
      softwareSkills: "TOOLS OF THE TRADE",
      toolStack: "TOOL STACK",
      toolStackMobileTitle: "INTERACTIVE TOOL STACK",
      toolStackMobileHint: "CLICK CARD TO MANIPULATE STACK",
      toolNo: "TOOL NO.",
      clickToDisplace: "CLICK TO DISPLACE",
      stack: "STACK",
      clickToRotate: "CLICK TO ROTATE",
    },
    tools: {
      davinci: { name: "DAVINCI RESOLVE", role: "COLOR GRADING" },
      afterEffects: { name: "AFTER EFFECTS", role: "MOTION DESIGN" },
      premiere: { name: "PREMIERE PRO", role: "VIDEO EDITING" },
      chatgpt: { name: "CHATGPT", role: "AI ASSISTANT" },
      kling: { name: "KLING AI", role: "AI VIDEO" },
    },
    projects: {
      label: "PROJECT",
      contactTab: "CONTACT PERSON",
      recap: "RECAP PROJECT 2025",
      ghost: "PORTFOLIO",
      watchProject: "WATCH PROJECT",
      swipeHint: "SWIPE",
      tapToPlay: "TAP TO PLAY",
      prevAria: "Previous project",
      nextAria: "Next project",
      projects: [
        { title: "PROJECT 01", category: "COMMERCIAL / 4K", desc: "Cinematic commercial featuring dynamic camera pacing and professional color grading." },
        { title: "PROJECT 02", category: "MOTION DESIGN", desc: "Atmospheric edit with intense sound design and custom visual effects overlays." },
        { title: "PROJECT 03", category: "SHORT FORM / TIKTOK", desc: "High-retention vertical edits designed for social media and short form platforms." },
        { title: "PROJECT 04", category: "DOCUMENTARY", desc: "Raw storytelling capturing authentic human moments and cinematic lighting." },
        { title: "PROJECT 05", category: "COMMERCIAL / 4K", desc: "Cinematic real estate edit highlighting premium spaces with elegant motion and depth." },
      ],
    },
    equipment: {
      label: "EQUIPMENT",
      profileTab: "PROFILE",
      projectTab: "PROJECT",
      subtitle: "The tools behind the frame",
      description: "Camera, workstation, sound and movement. Every tool has a purpose.",
      annotations: ["01 / CAMERA", "02 / WORKSTATION", "03 / MICROPHONE", "04 / GIMBAL"],
      items: [
        { name: "CAMERA", category: "Cinema Camera", description: "PRIMARY CAMERA SYSTEM" },
        { name: "WORKSTATION", category: "Editing Workstation", description: "POST-PRODUCTION AND FINISHING" },
        { name: "MICROPHONE", category: "Shotgun Microphone", description: "CLEAN LOCATION AUDIO" },
        { name: "GIMBAL", category: "Camera Gimbal", description: "STABILIZED MOVEMENT" },
      ],
      footer: "EQUIPMENT ARRAY / 04 ITEMS",
      footerRight: "DEPTH COMPOSITION — EDITORIAL",
    },
    contact: {
      label: "CONTACT PERSON",
      profileTab: "PROFILE",
      projectTab: "PROJECT",
      contactMe: "CONTACT ME",
      name: "PAULO VIEIRA",
      role: "VIDEO MAKER / EDITOR",
      instagram: "@pvieira.videos",
      whatsapp: "+55 12 98316-0115",
      thankYou: "THANK YOU",
      letsWork: "LET'S WORK TOGETHER",
    },
    modal: {
      projectId: "PROJECT ID:",
      closeAria: "Close video",
      closeLabel: "CLOSE",
      closeHint: "CLICK OUTSIDE TO CLOSE",
    },
  },
};