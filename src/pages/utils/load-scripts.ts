function loadScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(script); // Resolve a Promise quando o script for carregado
    script.onerror = () =>
      reject(new Error(`Failed to load script: ${src}`)); // Rejeita a Promise em caso de erro
    document.head.appendChild(script);
  });
}

export default loadScript;
