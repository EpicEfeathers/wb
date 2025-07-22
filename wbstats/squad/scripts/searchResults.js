import { displayAllSquadData } from './displayData.js'

const squads = ["$$$","-=SYN=-","-ARROW->","-GIGN-","-Rebel-","-U_A-",".INJ",".MP4","007","00N","100%","101ST","279VN","3.O","4GE","50.CAL","501st","67.","75322","9Ine","<KILL>","@_@","@__@","A.F.K","AAA","ABC","ACE","ACES","ACWB","AHK","AI","AKR","ALASKA","ALPHA","AMK","ANZAC","AOS","APEX","APG","APG-JR","ASIA","ASPECT","AURORA","AUS","AWD","AWM","Advanced","AjK","AltF4","America","Aplpha","Arctic","Arklan","Arrow","AusNZ","Axe","B.I.G","B0NK","BALD","BATFISH","BB$","BBQ","BEAST","BEASTS","BEKAS","BERRY","BETA","BLAST","BLOON","BOT","BRONCO","BROS","BRRRRRT","BRguy","BTB","BUMS","BUPP","Babayaga","BadBatch","Best","BoA","Bosniaks","Bot!!","Bully","Buster","CAESAR","CANADA","CCS","CHEATING","COA","COBRA","CODENAME","COLD","COMMANDO","CRO","CZECH","Castilla","Charcoal","Chicken","Cometer","Corgi","CraZy","Crown","D.J","D0C","DARKY","DEATH","DELTA_1","DEUS","DEV","DEVIL","DEVILS","DIABLO","DOG","DOOFIE","DRSN","DUBOS","DUCK","DUST","DUTCH","Da_YNG's","Danger","Deadmen","Delta","Dynamic","Dynamise","ECHO","EDF","EDG8","EK","ELLAS","ENFORCE","EP3R","EPIC","ERASE","ESP","EVIL","Eagles","Eclipse","Error","ExMilVet","Exile","F.B.I","F.C.","FA","FAITH","FAM","FEM","FIGHTER","FIGHTERS","FINESSE","FINF","FISH","FLAMES","FORCE","FORZA","FROZEN","FSB","FTW","FUMBLE","FUNCTION","FUNSTERS","Falcon","Falcons","Fear","Fire","Friends","Fuse","Fussel","G.O.A.T.","GBR","GBros","GER","GFBF","GGG","GHF","GIGN","GINGER","GLORY","GOAT","GOC","GOD","GO_SBKN!","GSG-9","GUEST","GZX","Ghost","Ghosts","Glitch","GreenSTO","Guests","H.M.S","HAKER","HAMMER","HAZARD","HCM","HF","HFF","HKC0D3","HOHO","HOPE","HOT","HP","HRD","HRT","HSG","HVK","HYDRA","Havoc","HellWall","Homies","Hunter","ICE","ICED","IHS","IMMORTAL","INJ","INJ.","INSANE","ISR","IX-","Initial","JDM","JOJO","JOKER","JPMAN","JTF2","JUSTICE","Japan","K!LLS","K-12","K.B.9","K.I.A.","K11NGS","KDR","KGB","KILLERS","KING","KNIFE","KR","KRAKEN","KRL","KSK","KVLT","Kinetic","Kings","Korea_","L2P","LEADERS","LEG1ON","LEGENDRY","LEGENDS","LEGIO","LEGION","LEO","LONGSHOT","LOR'D","LOST","LP","Lambda!","Lokivile","Lotus","Love","Lunar","M.E.G","M.I.5","M0rt@ls","MAF1A","MAFIA","MAG","MAVERIC","MAVERICK","MAYAN","MED","MEDIC","MEME","MIB","MKVI","MONKAAA","MORTIMER","MPP","MURICA","MZR","Major","Maun","MoW","N0W@R","NANDOS","NASA","NERDS","NERDS2","NEURO","NK-Zone","NRA","NRG","NX-01","Nucleus","OBJECT","OMEGA","ORANGE","OTSG","OUTLAW","Officers","Omni","P.T.S.D","P0L!C3","PAIN","PANDA","PANZER","PCN","PCrewAUS","PDI","PENTEST","PFJ","PH-Pinoy","PHP","PLG","PMC","POG","POKE","POV","POW","PPAP","PRCD","PROBOIZ","PROTOGEN","PSE","PVM...","Patate","Phantom","Pingu","Pixle","PoIar","Polar","Predator","Psalm","Q_Q","RADAR","RANGER","RAT","RATS","RDR2","REAL","RED","RESPECT","REX","RG4L","RHO","RISK","ROGUE","ROT","RPG","RU$","RUS","RUSSIA","RWS","RaB","Rawleak","Reaper","Reapers","RedFlys","Revive","RoX","S.T","S41","SAS","SASR","SAVIOR","SCREAM","SEAL","SEN","SFMF","SGNT","SHD","SHERB","SHFT","SICKOS","SIGMA","SK","SKS","SKU","SLIME","SNPR","SOAR","SOF","SOLDERS","SOSI","SPED","SQUID","SSR","STAR","STRIKE","STRIKER","SVEN","SWAT","SaIns","Saikyo","Scorpio","Scythe","Shadow","Sine","Skittles","Skynet","Slavs","Smell","Snipers","SoH","SpecOps","Spetsnaz","Squad","Squadles","Sr.","State","Summer","SupR","TACOS","TAIWAN","TBLF","TEA","TEK","TGK","THAI","THEBOYZ","TLN","TRUCK","TURKEY","TXV-47","Tank","Temu","Terror","The197th","TheEnd","Thunder","TopGun","TopHat","TotNA","Tradie","U.S.A","U.S.S","UMS","UNSC","USA","USEC","USS","USSR","Utubers","UwU","V4Y.hu","VANGAURD","VEX","VSU","VVV","Vertex","Vortex","W.B.G","W.S","WBAF","WBTeam","WCS","WOLF","WPN","WTW","WYS","Waffles","WarBroke","Warzone","Weranda","WoH","WolfPack","Wolves","Y-not","YOS","YSQ","ZER","^_^AURA","_0_","___","a-10s","allgoods","besteod","birds","brokers","cool","dragons","french","gGRu","generals","ghosts_","issam","kILLER","keksquad","killeres","korea","latam","mexicans","musters","nachos","peace","puckle","saveTF2","shameless","sorpox","sq21961","sq33427","sq83014","strength","t_and_co","tff","tg05","the_c.f.","totati","tsNT","uwu<3","vortexs","w!ch","what","world.jp","yups"]

export function searchResults(allSquadsData) {
    const input = document.querySelector(".squad-search-input")
    const results = document.querySelector(".search-results")

    // Detect any key press (so showing popup results)
    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim()
        results.innerHTML = ""

        if (query == "") return

        const matches = squads.filter( name => name.toLowerCase().includes(query.toLowerCase()))

        if (matches.length == 0) {
            results.innerHTML = "<div>No results...</div"
            return
        }

        matches.forEach(match => {
            const div = document.createElement("div")
            div.textContent = match
            div.addEventListener("click", () => {
                input.value = match
                results.innerHTML = ""
                window.location.reload();
                displayAllSquadData(match, allSquadsData)
            })
            results.appendChild(div)
        })
    })
}