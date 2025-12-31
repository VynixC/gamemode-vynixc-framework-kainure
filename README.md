# Gamemode VynixC (Framework Kainure)

Uma gamemode em JavaScript construída sobre o Framework Kainure, pronta para uso e evolução dentro do ecossistema da VynixC.

## Sobre
- Framework: Kainure — https://github.com/aldergrounds/kainure  
- Criadora do Kainure: AlderGrounds - https://discord.gg/MtkcE9cqKY  
- Organização oficial: VynixC — https://github.com/VynixC  

Esta gamemode utiliza o plugin Kainure para executar JavaScript/TypeScript diretamente no servidor SA-MP, aproveitando o motor V8 e o ecossistema Node.js.

## Requisitos
- SA-MP Server (Windows)
- Kainure.dll/.so adicionado em `plugins/`
- `libnode.dll/.so` na raiz do servidor
- Pasta `Kainure/` contendo `core/`, `types/` e `config.json`

## Configuração
No arquivo `Kainure/config.json`, o ponto de entrada já está configurado para:
```json
{
  "configs": {
    "main_file": "./game/main.js"
  },
  "typescript": {
    "auto_install": false,
    "enabled": false,
    "output_dir": "./dist"
  }
}
```

No `server.cfg`, certifique-se de incluir:
```cfg
plugins streamer.dll Kainure.dll
gamemode0 main
hostname Gamemode VynixC
language PT - BR
```

## Estrutura
```
/ (raiz)
├─ Kainure/
│  ├─ core/            (API e comandos globais do Kainure)
│  ├─ types/           (tipos e declarações)
│  └─ config.json      (aponta para ./game/main.js)
├─ game/
│  ├─ main.js          (ponto principal da gamemode)
│  └─ modules/
│     ├─ events.js     (ciclo de vida, autenticação, presença)
│     ├─ commands.js   (comandos de jogador)
│     ├─ admin.js      (permissões e comandos administrativos)
│     ├─ player.js     (estado do jogador, spawn, loadout)
│     ├─ db.js         (persistência via MySQL ou JSON)
│     ├─ resolve.js    (resolução de player por nome/id)
│     └─ mapas/mapls.js (mapeamentos e remoções de objetos)
└─ gamemodes/
   ├─ main.pwn         (placeholder padrão Pawn)
   └─ main.amx         (binário padrão do SA-MP)
```

## Funcionalidades
- Autenticação com dialogs (login/registro)
- Persistência de jogadores (MySQL) com fallback em `players.json`
- Atualização de presença online
- Comandos de qualidade de vida:  
  - `/cv [id] [cor1] [cor2]` cria veículo  
  - `/skin [id]` altera skin do jogador  
  - `/id [nome|id]` mostra informações de um jogador  
- Sistema administrativo com cargos e permissões:  
  - `/setcargo [nome] [cargo]`  
  - `/ban`, `/banip`, `/unban`, `/tp`, `/dararma`, `/setskin`, `/mute`
- Mapeamento de objetos por cidade (Los Santos) em `mapls.js`
- Mensagem para comandos inválidos: “Comando desconhecido. Use /ajuda”

## Como Executar
1. Coloque `Kainure.dll/.so` em `plugins/` e `libnode.dll/.so` na raiz do servidor.  
2. Verifique `Kainure/config.json` e `server.cfg`.  
3. Inicie `samp-server.exe`.  
4. A gamemode carregará `game/main.js` via Kainure.

## Desenvolvimento
- Os módulos do Kainure (`api.js`, `commands.js`, etc.) são carregados no escopo global.  
- Use `Public(...)`, `Native.<Função>()`, `Command(...)` diretamente.  
- A camada de persistência alterna para JSON quando não há MySQL disponível.  

## Créditos
- Kainure por AlderGrounds — https://github.com/aldergrounds/kainure  
- VynixC (organização oficial) — https://github.com/VynixC  

## Licença e Termos de Uso
- Licença: Apache License 2.0 — consulte o arquivo [LICENSE.txt](file:///e:/GameMode%20-%20VynixC/LICENSE.txt).  
- Termos de uso desta gamemode:
  - Uso somente para estudos.
  - Caso instale ou publique, mantenha os créditos totais para VynixC e AlderGrounds/Kainure.
  - O descumprimento poderá resultar em punições pela organização VynixC.
