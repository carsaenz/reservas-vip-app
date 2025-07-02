"use client";
import React, { useState, useEffect } from "react";

// Función para normalizar texto (quita tildes y pasa a minúsculas)
function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


// Lista unificada de saludos e información
const saludosInfo = [
  "buen día señor","buen día señora","buenos días estimado","buenas tardes caballero","buenas noches señorita","saludos cordiales","mucho gusto en saludarle",
  "espero se encuentre bien","reciba un cordial saludo","le deseo buen día","a sus órdenes","en qué puedo ayudarle hoy","es un placer atenderle","agradezco su contacto",
  "qué gusto saludarle","cómo puedo asistirle","estoy para servirle","feliz día tenga usted","reciba mis saludos","buen día equipo","saludos respetuosos",
  "cómo ha estado usted","le saludo atentamente","que tenga excelente día","deseo buen día","es un honor saludarle","saludos de mi parte","feliz tarde le deseo",
  "que tenga bonito día","reciba un afectuoso saludo","buen día cliente","saludos cordiales cliente","feliz mañana tenga","espero tenga buen día",
  "saludos desde nuestra tienda","le saludo con respeto","que disfrute su día","buen día usuario","saludos desde el equipo","feliz jornada tenga",
  "que tenga lindo día","saludos cordiales usuario","le deseo feliz tarde","buen día comprador","saludos desde servicio al cliente",
  "feliz noche le deseo","que tenga agradable día","saludos desde atención al cliente","le deseo próspero día","buen día visitante","saludos desde ventas",
  "feliz mañana le deseo","que tenga productivo día","saludos desde soporte","le deseo excelente tarde","buen día consumidor","saludos desde e-commerce",
  "feliz tarde le deseo","que tenga maravilloso día","saludos desde logística","le deseo espléndido día","buen día compradora","saludos desde marketing",
  "feliz noche le deseo","que tenga radiante día","saludos desde administración","le deseo fantástico día","buen día usuario premium","saludos desde sistemas",
  "feliz mañana le deseo","que tenga espléndido día","saludos desde desarrollo","le deseo maravilloso día","buen día cliente frecuente","saludos desde diseño",
  "feliz tarde le deseo","que tenga fructífero día","saludos desde producción","le deseo radiante día","buen día suscriptor","saludos desde calidad","feliz noche le deseo",
  "que tenga venturoso día","saludos desde innovación","le deseo próspera tarde","buen día inversionista","saludos desde recursos humanos","feliz mañana le deseo",
  "que tenga bendecido día","saludos desde finanzas","le deseo exitoso día","buen día colaborador","saludos desde tecnología","feliz tarde le deseo","que tenga motivado día",
  "saludos desde operaciones","le deseo inspirador día","qué tranza carnal","qué show compa","qué rollo parce","qué más mi llave","qué pex socio","qué hongo bro",
  "qué pedo wey","qué más mi pana","qué hubo mi rey","qué más mi gente","hola compadre","hola comadre","hola hermano","hola hermana","hola primo","hola prima","hola tío",
  "hola tía","hola jefe","hola jefa","hola vecino","hola vecina","hola amigazo","hola amigaza","hola chavón","hola chavona","hola manito","hola manita","hola cuate",
  "hola cuata","hola ñero","hola ñera","hola mijo","hola mija","hola chamo","hola chama","hola pata","hola pata","hola loco","hola loca","hola chino","hola china","hola güey",
  "hola güera","hola morro","hola morra","hola chavo","hola chava","hola muchá","hola muchá","hola chiquitín","hola chiquitina","hola enano","hola enana","hola flaco",
  "hola flaca","hola gordo","hola gorda","hola cholo","hola chola","hola negro","hola negra","hola blanco","hola blanca","hola rubio","hola rubia","hola moreno","hola morena",
  "hola pelado","hola pelada","hola calvo","hola calva","hola chistoso","hola chistosa","hola serio","hola seria","hola alegre","hola alegra","hola triste","hola tristón",
  "hola dormilón","hola dormilona","hola comelón","hola comelona","hola trabajador","hola trabajadora","hola flojo","hola floja","hola listo","hola lista","hola inteligente",
  "hola sabio","hola sabia","hola genio","hola genia","hola crack","hola estrella","hola campeón","hola campeona","hola ídolo","hola ídola","hola leyenda","hola fenómeno",
  "hola fenómena","hola máquina","hola prodigio","hola talento","hola artista","hl","hla","bn","bd","bt","bnss","q tl","k tl","q ond","q hb","q px","q trnz","q ped","q hgo",
  "q xop","q mas","cm sts","cm ands","cm vas","cm va","hl bb","hl lnd","hl prro","hl mrc","hl nft","hl gg","hl op","hl nt","hl dc","hl mrd","hl wtf","hl lol","hl xd","hl bbs",
  "hl tkm","hl tqm","hl stp","hl ntp","hl sptm","hl ptm","hl csm","hl ctm","hl jdd","hl kbrn","hl ksa","hl kzo","hl kzo","hl mnda","hl mnd","hl gfa","hl gfe","hl pto","hl pta",
  "hl vrg","hl vrg","hl chd","hl chd","hl nms","hl nmms","hl nmmn","hl nmms","hl qxo","hl qxa","hl qlo","hl qla","hl qro","hl qra","hl qco","hl qca","hl qto","hl qta","hl qdo",
  "hl qda","hl qno","hl qna","hl qso","hl qsa","hl qgo","hl qga","hl qvo","hl qva","hl qzo","hl qza","hl qño","hl qña","hl qpo","hl qpa","hl qto","hl qta","hl qdo","hl qda",
  "hl qno","hl qna","hl qso","hl qsa","hl qgo","hl qga","hl qvo","hl qva","hl qzo","hl qza","hl qño","hl qña","hl qpo","hl qpa","hola solesito","hola lunita","hola estrellita",
  "hola cielito","hola corazoncito","hola bomboncito","hola chiquitito","hola amorcito","hola tesorito","hola gatito","hola perrito","hola osito","hola patito","hola pollito",
  "hola pecesito","hola pajarito","hola conejito","hola ratoncito","hola elefantito","hola jirafita","hola cebrit","hola", "hola!", "holaa", "holaaa", "holi", "holis", "holiwis",
  "hola buenos dias", "hola buenas tardes", "hola buenas noches","hola como estas", "hola que tal", "hola buen dia", "hola mucho gusto","saludos", "buenos dias", "buenas tardes", "buenas noches", "mucho gusto",
  "un gusto", "como estas", "que tal", "hey", "buen dia", "hola equipo","hola amigo", "hola amiga", "hola señor", "hola señora", "hola estimado","hola estimada", "hola colega", "hola compañero", "hola compañera",
  "ola", "ola!", "ola k ase", "hl", "hla", "buenas", "bn", "bd", "bt", "bnss","buen día señor","buen día señora","buenos días estimado","buenas tardes caballero","buenas noches señorita","saludos cordiales","mucho gusto en saludarle",
  "espero se encuentre bien","reciba un cordial saludo","le deseo buen día","a sus órdenes","en qué puedo ayudarle hoy","es un placer atenderle","agradezco su contacto",
  "qué gusto saludarle","cómo puedo asistirle","estoy para servirle","feliz día tenga usted","reciba mis saludos","buen día equipo","saludos respetuosos","cómo ha estado usted",
  "le saludo atentamente","que tenga excelente día","deseo buen día","es un honor saludarle","saludos de mi parte","feliz tarde le deseo","que tenga bonito día","reciba un afectuoso saludo","hola", "buenos días",
  "buenas tardes", "buenas noches", "hola, cómo estás","qué tal", "cómo están", "saludos", "hola equipo", "hola hotel",
  "muy buenas", "qué más", "cómo va todo", "buen día", "hey",
  "hola, me gustaría saber algo", "saludos cordiales", "qué hay de nuevo", "hola, necesito ayuda", "buenas, tengo una pregunta",
  "hola, quisiera consultar algo", "hola, hay alguien", "hola, tienen atención", "buenas noches, quería saber algo", "buenos días, puedo preguntar algo",
  "buenas tardes, necesito orientación", "hola, quisiera hablar con alguien", "hola, ¿me pueden responder?", "buenas, cómo están", "hola, ¿quién me atiende?",
  "qué más pues", "cómo vas", "qué hubo", "buenas, ¿cómo estamos?", "hola, parce",
  "qué se dice", "hola, mi llave", "cómo andás", "qué cuentan", "hola mi gente",
  "bien o no", "todo bien", "cómo le ha ido", "qué ha hecho", "cómo vamos",
  "hola, ñero", "buenas, todo bien", "cómo estamos", "hola pues", "hola, socio",
  "qué milagro", "mi hermano, saludos", "qué dice la buena", "cómo me le va", "buenas noches, vecino",
  "hola, patrón", "qué hay de nuevo", "saludos mi rey", "hola, mi reina", "bienvenido, mijo",
  "hola, ¿hay alguien ahí?", "qué más, bot", "buenas, ¿me pueden ayudar?", "hey, ¿quién responde?", "hola, ¿con quién hablo?",
  "buenas noches, ¿este es el chat del hotel?", "hola, ¿me atiende una persona o un robot?", "qué tal, necesito ayuda", "hola, asistente", "hola, ¿esto es automático?",
  "hey, ¿estás funcionando?", "hola, ¿puedo hacerte una pregunta?", "saludos, necesito algo", "holi", "buenas, ¿con quién tengo el gusto?",
  "hola, ¿puedes ayudarme?", "qué más, máquina", "hola sistema", "qué tal todo por aquí",
  "buenas, ¿me das una mano?", "hola, ¿me contestas?", "hola señor chatbot", "cómo amaneces, bot", "qué hubo, ¿me puedes colaborar?",
  "hola, ¿esto es un bot o una persona?", "qué se cuenta este chat", "hey bot, ¿me ayudas?", "hola, estoy por acá", "saludos desde Medellín",
  "me pueden dar información", "quisiera más detalles", "pueden explicarme los servicios", "cuáles son los precios", "cómo es el hotel",
  "Hola buen día", "Buenas tardes", "Hola ¿me podrías ayudar?", "Disculpa tengo una duda", "Hola quería hacerte una pregunta", "Buenos días necesito tu ayuda",
  "Hola ¿me puedes guiar?", "Oye vecino, una cosita", "Hola ¿tienes un tiempito?", "Buen día ¿me puedes asesorar?", "Hola estoy mirando unos productos",
  "Buenas parcero, una consulta", "Hola ¿me echas una mano?", "Disculpa la molestia", "Hola ¿sabes de las promociones?", "Buen día te pregunto algo",
  "Hola estaba viendo los productos", "Oye hermano, una preguntica", "Hola necesito tu consejo", "Buenas tardes te cuento...",
  "Hola quería saber algo", "Disculpa ¿sabes si hay descuentos?", "Hola estoy buscando zapatos", "Buen día una preguntita",
  "Hola me gusta este producto", "Oye antes de comprar quería confirmar", "Hola ¿me das más información?", "Buenas estaba viendo el catálogo",
  "Hola ¿qué más? Quería preguntar", "Disculpa ¿me puedes ayudar?", "Hola vi unos tenis que me gustan", "Buen día antes de pagar...",
  "Hola tengo dudas con los tamaños", "Oye ¿sabes si llega hoy?", "Hola ¿me puedes orientar?", "Buenas tardes una consultica", "Hola estaba por comprar unos jeans",
  "Disculpa ¿podrías decirme el precio?", "Hola me interesa saber los colores", "Buen día te pregunto por los envíos", "Hola ¿tienen esta camisa en azul?",
  "Oye antes de pagar quería ver tallas", "Hola necesito saber medidas exactas", "Buenas ¿me puedes decir los materiales?", "Hola quería confirmar los pagos",
  "Disculpa una preguntita rápida", "Hola ¿me ayudas con las tallas?", "Buen día te cuento mi situación", "Hola estoy por comprar pero dudo", "Oye compadre ¿me resuelves esto?",
  "Hola, ¿qué más?", "Buen día, ¿cómo estás?", "Quiubo, parce", "Hola vecino, ¿me ayudas?", "Buenas tardes, compadre", "Hola hermano, ¿cómo va?",
  "Saludos, ¿me orientas?", "Buen día, amigo", "Hola vecina, ¿tienes un momento?", "Quiubo, ¿qué cuentas?", "Hola compañero, buen día", "Buenas, ¿me escuchas?",
  "Hola socio, ¿cómo vas?", "Saludos desde Medellín", "Buen día desde Bogotá", "Hola paisano", "Buenas, ¿me regalas un momento?", "Quiubo, ¿todo bien?",
  "Hola amigo, ¿cómo estás?", "Buen día, vecinito", "Hola, ¿cómo te trata el día?", "Buenas tardes, ¿me colaboras?", "Quiubo, ¿cómo va eso?", "Hola compa, buen día",
  "Saludos, ¿me das una mano?", "Buen día, ¿cómo vamos?", "Hola vecino, saludos", "Buenas, ¿qué hubo?", "Quiubo, ¿cómo estás hoy?", "Hola hermano, ¿qué más pues?",
  "Buen día, ¿todo tranquilo?", "Hola amiga, ¿cómo le va?", "Saludos, ¿me ayudas?", "Buenas tardes, vecinito", "Hola parcero, ¿cómo vas?", "Quiubo, ¿cómo está la cosa?",
  "Buen día, ¿me escuchas bien?", "Hola compadre, saludos", "Buenas, ¿qué más mi rey?", "Hola vecina, ¿cómo estás?", "Quiubo, ¿cómo te ha ido?",
  "Buen día, ¿me regalas atención?", "Hola hermano, ¿qué más?", "Saludos, ¿me oyes?", "Buenas tardes, camarada", "Hola compa, ¿cómo va todo?", "Quiubo, ¿cómo le va?",
  "Buen día, vecinita", "Hola amigo, saludos cordiales", "Buenas, ¿me das pelota?", "Hola parcera, ¿cómo estás?", "Quiubo, ¿cómo va el día?", "Buen día, ¿me atiendes?",
  "Hola vecino, ¿qué más?", "Saludos, ¿me escuchas ahí?", "Buenas tardes, compai", "Hola hermano, ¿cómo le va?", "Quiubo, ¿cómo vas?", "Buen día, vecinito lindo",
  "Hola compadre, ¿cómo estás?", "Buenas, ¿me regalas un tiempito?", "Hola parcero, saludos", "Quiubo, ¿cómo va la vida?", "Buen día, vecina hermosa",
  "Hola amigo, ¿cómo te trata el día?", "Saludos, ¿me ayudas un momentico?", "Buenas tardes, compinche", "Hola compa, ¿cómo vas?", "Quiubo, ¿cómo está usted?",
  "Buen día, vecinita querida", "Hola hermano, saludos cordiales", "Buenas, ¿me regalas atención?", "Hola parcera, ¿cómo le va?", "Quiubo, ¿cómo va todo?",
  "Buen día, vecino lindo", "Hola compadre, ¿cómo vas?", "Saludos, ¿me das una ayudita?", "Buenas tardes, camarada lindo", "Hola compa, ¿cómo estás?",
  "Quiubo, ¿cómo te ha ido hoy?", "Buen día, vecinita amable", "Hola hermano, ¿qué más mi rey?", "Buenas, ¿me regalas un momentico?",
  "Hola parcero, ¿cómo va la cosa?", "Quiubo, ¿cómo está compai?", "Buen día, vecino chévere", "Saludos, ¿me colaboras?", "Buenas tardes, compadre lindo",
  "Hola compa, ¿cómo le va?", "Quiubo, ¿cómo vas hoy?", "Buen día, vecinita linda", "Hola hermano, saludos desde Cali", "Buenas, ¿me regalas un poquito de atención?",
  "Hola parcera, ¿cómo estás hoy?", "Quiubo, ¿cómo va el asunto?", "Buen día, vecino amable", "Saludos, ¿me das una manito?", "Buenas tardes, compai lindo",
  "Hola compa, ¿cómo vas pues?", "Quiubo, ¿cómo está la vida?", "Buen día, vecinita hermosa", "Hola hermano, saludos desde Medellín", "Buenas, ¿me regalas un segundo?",
  "Hola parcero, ¿cómo va todo?", "Quiubo, ¿cómo estás compadre?", "Buen día, vecino querido", "Saludos, ¿me ayudas un poquito?","good morning sir", "good morning madam", "good morning dear", "good afternoon gentleman", "good evening miss", "kind regards", "nice to greet you",
  "hope you are well", "receive a cordial greeting", "wish you a good day", "at your service", "how can I help you today", "it's a pleasure to assist you", "thank you for contacting us",
  "glad to greet you", "how can I assist you", "I am here to serve you", "have a nice day", "best regards", "good day team", "respectful greetings",
  "how have you been", "I greet you attentively", "have an excellent day", "wish you a good day", "it's an honor to greet you", "greetings from me", "have a nice afternoon",
  "have a nice day", "receive a warm greeting", "good day client", "kind regards client", "happy morning", "hope you have a good day",
  "greetings from our store", "I greet you with respect", "enjoy your day", "good day user", "greetings from the team", "have a great day",
  "have a nice day", "kind regards user", "wish you a happy afternoon", "good day buyer", "greetings from customer service",
  "wish you a good night", "have a pleasant day", "greetings from customer support", "wish you a prosperous day", "good day visitor", "greetings from sales",
  "happy morning", "have a productive day", "greetings from support", "wish you an excellent afternoon", "good day consumer", "greetings from e-commerce",
  "have a wonderful afternoon", "have a wonderful day", "greetings from logistics", "wish you a splendid day", "good day buyer", "greetings from marketing",
  "wish you a radiant night", "have a radiant day", "greetings from administration", "wish you a fantastic day", "good day premium user", "greetings from systems",
  "happy morning", "have a splendid day", "greetings from development", "wish you a wonderful day", "good day frequent client", "greetings from design",
  "have a fruitful afternoon", "greetings from production", "wish you a radiant day", "good day subscriber", "greetings from quality", "wish you a good night",
  "have a successful day", "greetings from innovation", "wish you a prosperous afternoon", "good day investor", "greetings from human resources", "happy morning",
  "have a blessed day", "greetings from finance", "wish you a successful day", "good day collaborator", "greetings from technology", "have a motivated day",
  "greetings from operations", "wish you an inspiring day", "what's up my friend", "what's up buddy", "what's up dude", "what's up pal", "what's up mate", "what's up bro", "hello", "hi", "hey", "good morning", "good afternoon", "good evening", "good night", "greetings", "how are you", "how do you do", "nice to meet you", "pleased to meet you",
  "how can I help you", "how may I assist you", "hope you are well", "best regards", "kind regards", "good day", "what's up", "what's new", "how's it going", "how are things",
  "how's everything", "how's your day", "how are you doing", "how can I assist you", "at your service", "it's a pleasure to help you", "thank you for your contact",
  "happy day", "enjoy your day", "welcome", "hello team", "hello friend", "hello customer", "hello user", "hello client", "hello staff", "hello support", "hello sales",
  "hello admin", "hello marketing", "hello designer", "hello developer", "hello subscriber", "hello visitor", "hello buyer", "hello guest", "hello partner", "hello neighbor"

];

// Lista de frases de reserva
const reservas = [
  "quiero reservar una habitación","resrva","necesito hacer una reservación","deseo reservar un cuarto","quiero apartar una habitación","me gustaría reservar",
  "busco reservar para fechas","quiero reservación en hotel","necesito habitación para","deseo reserva en","quiero alojamiento para","necesito reservar hotel",
  "quiero bookear una habitación","deseo hacer booking","quiero reservar noche","necesito quedarme en","deseo alquilar habitación","quiero hospedarme en",
  "necesito check-in para","deseo hacer check-in","quiero reservar suite","necesito habitación doble","deseo cuarto individual","quiero reservar familiar",
  "necesito habitación matrimonial","deseo suite ejecutiva","quiero reservar con vista","necesito alojamiento económico","deseo hotel boutique",
  "quiero reservar all inclusive","necesito plan todo incluido","deseo media pensión","quiero reservar con desayuno","necesito habitación con balcón",
  "deseo cuarto con jacuzzi","quiero reservar piso ejecutivo","necesito conectado a sala","deseo habitación adaptada","quiero reservar para adultos",
  "necesito hotel pet friendly","deseo llevar mascota","quiero reserva no reembolsable","necesito cancelación gratis","deseo política flexible",
  "quiero modificar reserva","necesito cambiar fechas","deseo ajustar estadía","quiero extender reservación","necesito más noches","deseo reducir estadía",
  "quiero cancelar reserva","necesito anular booking","deseo reembolso por","quiero confirmar reservación","necesito comprobante de","deseo voucher de",
  "quiero ver disponibilidad","necesito saber si hay","deseo consultar fechas","quiero ver opciones","necesito comparar habitaciones","deseo fotos del",
  "quiero descripción de","necesito amenities incluidos","deseo lista de","quiero política de","necesito reglas del","deseo horario de","quiero ubicación exacta",
  "necesito mapa del","deseo transporte desde","quiero reservar shuttle","necesito pickup en","deseo traslado a","quiero estacionamiento incluido",
  "necesito parking gratis","deseo valet parking","quiero reservar con spa","necesito acceso a","deseo usar gimnasio","quiero piscina incluida",
  "necesito zona infantil","deseo actividades para","quiero reservar tour","necesito excursiones en","deseo paquete turístico","quiero city tour",
  "necesito guía local","deseo recomendaciones de","quiero restaurante en","necesito room service","deseo minibar incluido","quiero cocina equipada",
  "necesito lavandería en","deseo servicio a","quiero wifi gratis","necesito internet rápido","deseo streaming en","quiero TV por","necesito Netflix incluido",
  "deseo aire acondicionado","quiero calefacción central","necesito caja fuerte","deseo secador de","quiero plancha incluida","necesito adaptador para",
  "deseo enchufes internacionales","quiero reservar mesa","necesito hacer reservación","deseo apartar lugar","quiero booking para","necesito reservar cena",
  "deseo almuerzo para","quiero reservar desayuno","necesito brunch en","deseo happy hour","quiero reservar terraza","necesito mesa exterior","deseo lugar interior",
  "quiero reservar privado","necesito salón ejecutivo","deseo área VIP","quiero reservar evento","necesito espacio para","deseo hacer fiesta",
  "quiero reservar cumpleaños","necesito aniversario en","deseo reunión corporativa","quiero reservar conferencia","necesito seminario en",
  "deseo taller gastronómico","quiero show en","necesito música en","deseo buffet para","quiero menú degustación","necesito carta especial","deseo opciones veganas",
  "quiero sin gluten","necesito alergias alimentarias","deseo requerimientos dietéticos","quiero reservar chef","necesito cocina show","deseo mesa con",
  "quiero vista al","necesito romántica para","deseo ambiente familiar","quiero zona kids","necesito juegos infantiles","deseo estacionamiento para",
  "quiero valet parking","necesito acceso discapacitados","deseo silla alta","quiero cambiador para","necesito confirmar reserva","deseo modificar personas",
  "quiero aumentar invitados","necesito reducir comensales","deseo cambiar horario","quiero ajustar reservación","necesito cancelar cena","deseo política de",
  "quiero reembolso por","necesito voucher de","deseo código QR","quiero reservar taxi","necesito transporte a","deseo shuttle desde","quiero bookear traslado",
  "necesito pickup en","deseo drop-off a","quiero reservar limusina","necesito vehículo ejecutivo","deseo coche de","quiero rentar auto","necesito alquilar carro",
  "deseo reservar moto","quiero bicicleta en","necesito scooter para","deseo barco para","quiero reservar yate","necesito charter de","deseo vuelo privado",
  "quiero helicóptero a","necesito boleto de","deseo pasaje para","quiero reservar asiento","necesito cambiar vuelo","deseo upgrade a","quiero primera clase",
  "necesito business class","deseo equipaje extra","quiero maleta incluida","necesito seguro de","deseo cobertura para","quiero reservar tour","necesito excursión a",
  "deseo guía turístico","quiero entrada a","necesito boleto para","deseo acceso a","quiero pase rápido","necesito skip the","deseo reservar experiencia",
  "quiero actividad en","necesito clase de","deseo taller para","quiero cita en","necesito reservar hora","deseo agendar cita","quiero consulta con",
  "necesito servicio de","deseo técnico para","quiero instalación de","necesito reparación en","deseo mantenimiento a","quiero reservar masaje","necesito spa para",
  "deseo tratamiento de","quiero terapia en","necesito sesión de","deseo paquete wellness","quiero día completo","necesito relajación en","deseo reservar cancha",
  "quiero campo de","necesito pista para","deseo acceso gimnasio","quiero reservar piscina","necesito cabaña en","deseo locker para","quiero equipo deportivo",
  "necesito instructor de","deseo alquilar herramienta","quiero maquinaria para","necesito reservar salón","deseo espacio coworking","quiero oficina por",
  "necesito auditorio para","deseo estudio de","quiero grabación en","necesito streaming para","deseo fotógrafo en","quiero camarógrafo para",
  "necesito iluminación en","deseo sonido profesional","quiero catering para","necesito mobiliario en","deseo decoración para","quiero animación en",
  "necesito show para","deseo música en","quiero confirmar servicio","necesito cambiar fecha","deseo ajustar horario","quiero cancelar booking",
  "necesito reembolso por","deseo voucher de","reservar","reserva","reservación","booking","bookear","apartar","alquilar","quedarme","check-in","hospedarme",
  "habitación","cuarto","suite","hotel","restaurante","mesa","vuelo","transporte","tour","excursión","traslado","shuttle","pickup","evento","fiesta","cita","hora",
  "agendar","confirmar","modificar","cancelar","disponibilidad","fechas","noches","personas","adultos","niños","mascota","check-out","política","cancelación",
  "reembolso","voucher","comprobante","depósito","pago","tarifa","precio","incluye","servicio","equipaje","maleta","asiento","menu","alergias","dietas","wifi",
  "i want to book a room", "reservation", "i need to make a reservation", "i want to reserve a room", "i'd like to book a room", "i'd like to reserve",
  "i want to book for dates", "i want a hotel reservation", "i need a room for", "i want a reservation at", "i want accommodation for", "i need to book a hotel",
  "i want to book a suite", "i want to book a night", "i need to stay at", "i want to rent a room", "i want to stay at the hotel",
  "i need check-in for", "i want to check in", "i want to book a suite", "i need a double room", "i want a single room", "i want to book a family room",
  "i need a matrimonial room", "i want an executive suite", "i want a room with a view", "i need budget accommodation", "i want a boutique hotel",
  "i want all inclusive", "i need an all inclusive plan", "i want half board", "i want to book with breakfast", "i need a room with balcony",
  "i want a room with jacuzzi", "i want to book executive floor", "i need a room connected to living room", "i want an adapted room", "i want to book for adults only",
  "i need a pet friendly hotel", "i want to bring my pet", "i want a non-refundable reservation", "i need free cancellation", "i want a flexible policy",
  "i want to modify my reservation", "i need to change dates", "i want to adjust my stay", "i want to extend my reservation", "i need more nights", "i want to reduce my stay",
  "i want to cancel my reservation", "i need to cancel my booking", "i want a refund for", "i want to confirm my reservation", "i need a receipt for", "i want a voucher for",
  "i want to check availability", "i need to know if there is", "i want to check dates", "i want to see options", "i need to compare rooms", "i want photos of",
  "i want a description of", "i need included amenities", "i want a list of", "i want to know the policy", "i need the rules", "i want to know the schedule", "i want the exact location",
  "i need a map of", "i want transport from", "i want to book a shuttle", "i need a pickup at", "i want a transfer to", "i want parking included",
  "i need free parking", "i want valet parking", "i want to book with spa", "i need access to", "i want to use the gym", "i want a pool included",
  "i need a kids area", "i want activities for", "i want to book a tour", "i need excursions in", "i want a tourist package", "i want a city tour",
  "i need a local guide", "i want recommendations for", "i want a restaurant at", "i need room service", "i want minibar included", "i want an equipped kitchen",
  "i need laundry", "i want service to", "i want free wifi", "i need fast internet", "i want streaming", "i want tv", "i need netflix included",
  "i want air conditioning", "i want central heating", "i need a safe", "i want a hair dryer", "i want an iron included", "i need an adapter for",
  "i want international plugs", "i want to book a table", "i need to make a reservation", "i want to reserve a place", "i want a booking for", "i need to book dinner",
  "i want lunch for", "i want to book breakfast", "i need brunch at", "i want happy hour", "i want to book a terrace", "i need an outdoor table", "i want an indoor place",
  "i want to book private", "i need an executive lounge", "i want a vip area", "i want to book an event", "i need space for", "i want to have a party",
  "i want to book a birthday", "i need an anniversary at", "i want a corporate meeting", "i want to book a conference", "i need a seminar at",
  "i want a cooking workshop", "i want a show at", "i need music at", "i want a buffet for", "i want a tasting menu", "i need a special menu", "i want vegan options",
  "i want gluten free", "i need food allergies", "i want dietary requirements", "i want to book a chef", "i need a show kitchen", "i want a table with",
  "i want a view of", "i need a romantic for", "i want a family atmosphere", "i want a kids zone", "i need children's games", "i want parking for",
  "i want valet parking", "i need disabled access", "i want a high chair", "i want a changing table", "i need to confirm my reservation", "i want to modify guests",
  "i want to add guests", "i need to reduce guests", "i want to change the schedule", "i want to adjust my reservation", "i need to cancel dinner", "i want a policy for",
  "i want a refund for", "i need a voucher for", "i want a qr code", "i want to book a taxi", "i need transport to", "i want a shuttle from", "i want to book a transfer",
  "i need a pickup at", "i want a drop-off at", "i want to book a limousine", "i need an executive vehicle", "i want a car", "i want to rent a car", "i need to rent a car",
  "i want to book a motorcycle", "i want a bicycle at", "i need a scooter for", "i want a boat for", "i want to book a yacht", "i need a charter for", "i want a private flight",
  "i want a helicopter to", "i need a ticket for", "i want a ticket for", "i want to book a seat", "i need to change my flight", "i want an upgrade to", "i want first class",
  "i need business class", "i want extra luggage", "i want luggage included", "i need insurance for", "i want coverage for", "i want to book a tour", "i need an excursion to",
  "i want a tourist guide", "i want an entrance to", "i need a ticket for", "i want access to", "i want fast pass", "i need skip the line", "i want to book an experience",
  "i want an activity at", "i need a class of", "i want a workshop for", "i want an appointment at", "i need to book a time", "i want to schedule an appointment", "i want a consultation with",
  "i need a service for", "i want a technician for", "i want an installation of", "i need a repair at", "i want maintenance for", "i want to book a massage", "i need a spa for",
  "i want a treatment for", "i want therapy at", "i need a session of", "i want a wellness package", "i want a full day", "i need relaxation at", "i want to book a court",
  "i want a field of", "i need a track for", "i want gym access", "i want to book a pool", "i need a cabin at", "i want a locker for", "i want sports equipment",
  "i need an instructor for", "i want to rent a tool", "i want machinery for", "i need to book a hall", "i want coworking space", "i want an office for",
  "i need an auditorium for", "i want a studio of", "i want a recording at", "i need streaming for", "i want a photographer at", "i want a cameraman for",
  "i need lighting at", "i want professional sound", "i want catering for", "i need furniture at", "i want decoration for", "i want animation at",
  "i need a show for", "i want music at", "i want to confirm service", "i need to change the date", "i want to adjust the schedule", "i want to cancel booking",
  "i need a refund for", "i want a voucher for",
  "book", "booking", "reserve", "reservation", "rent", "stay", "check-in", "check-out", "room", "suite", "hotel", "restaurant", "table", "flight", "transport", "tour", "excursión", "transfer", "shuttle", "pickup", "event", "party", "appointment", "time", "schedule", "confirm", "modify", "cancel", "availability", "dates", "nights", "people", "adults", "children", "pet", "policy", "cancellation", "refund", "voucher", "receipt", "deposit", "payment", "rate", "price", "includes", "service", "luggage", "bag", "seat", "menu", "allergies", "diets", "wifi"
];
const faq = {
  es: [
    { pregunta: "¿cuales son los metodos de pago?", respuesta: "Aceptamos tarjetas de crédito, débito y transferencias bancarias." },
    { pregunta: "¿tienen wifi?", respuesta: "Sí, todos nuestros hoteles ofrecen wifi gratuito." },
    { pregunta: "¿el desayuno esta incluido?", respuesta: "El desayuno está incluido en la mayoría de nuestras tarifas." }
  ],
  en: [
    { pregunta: "what payment methods do you accept?", respuesta: "We accept credit cards, debit cards, and bank transfers." },
    { pregunta: "do you have wifi?", respuesta: "Yes, all our hotels offer free wifi." },
    { pregunta: "is breakfast included?", respuesta: "Breakfast is included in most of our rates." }
  ]
};

export default function Chatbot({
  ciudades,
  hotelesPorCiudad,
  habitacionesPorHotel,
  onShowHoteles,
  onShowHabitaciones,
  reservaFinalizada,
  onResetReserva
}: {
  ciudades: { id: string; nombre: string; imagen: string; descripcion: string }[],
  hotelesPorCiudad: Record<string, { id: string; nombre: string; imagen: string; descripcion: string }[]> ,
  habitacionesPorHotel: Record<string, { id: string; nombre: string; imagen: string; descripcion: string; precio: string; capacidad: string; servicios: string[] }[]>,
  onShowHoteles: (hoteles: { id: string; nombre: string; imagen: string; descripcion: string }[]) => void,
  onShowHabitaciones: (habitaciones: { id: string; nombre: string; imagen: string; descripcion: string; precio: string; capacidad: string; servicios: string[] }[]) => void,
  reservaFinalizada?: boolean,
  onResetReserva?: () => void
}) {

  // --- INICIALIZAR MAPA GLOBAL DE HABITACION -> HOTEL/CIUDAD ---
  useEffect(() => {
    // Solo en cliente
    if (typeof window !== "undefined") {
      const mapa: Record<string, { hotel: string; ciudad: string }> = {};
      for (const [ciudadId, hoteles] of Object.entries(hotelesPorCiudad)) {
        for (const hotel of hoteles) {
          const habitaciones = habitacionesPorHotel[hotel.id] || [];
          for (const habitacion of habitaciones) {
            mapa[habitacion.id] = { hotel: hotel.id, ciudad: ciudadId };
          }
        }
      }
      // @ts-expect-error: window property for hotel-habitacion mapping
      window.__HOTELES_POR_HAB = mapa;
    }
  }, [hotelesPorCiudad, habitacionesPorHotel]);

  type CiudadItem = { tipo: "ciudad"; id: string; nombre: string; imagen: string; descripcion: string };
  type HotelItem = { tipo: "hotel"; id: string; nombre: string; imagen: string; descripcion: string };
  type HabitacionItem = { tipo: "habitacion"; id: string; nombre: string; imagen: string; descripcion: string; precio: string; capacidad: string; servicios: string[] };
  type Sitio = { tipo: "sitio"; nombre: string; descripcion: string; imagen: string; ubicacion: string };
  type Mensaje = {
    autor: "bot" | "usuario";
    texto: string;
    imagen?: string;
    items?: (CiudadItem | HotelItem | HabitacionItem | Sitio)[];
  };
  // Elimina variables no usadas y tipa correctamente los estados
  const [sitioAmpliado, setSitioAmpliado] = useState<Sitio | null>(null);
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  const [estado, setEstado] = useState<"inicio" | "ciudad" | "hotel" | "habitacion">("inicio");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string | null>(null);
  // Eliminar hotelSeleccionado, no se usa en la lógica
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState("");

  const traducciones = {
    es: {
      saludo: "¡Hola! ¿En qué puedo ayudarte?",
      deseaAlgoMas: "¿Desea algo más? Puede reservar otra habitación o consultar información.",
      seleccionaCiudad: "Selecciona una ciudad:",
      seleccionaHotel: "Selecciona un hotel:",
      seleccionaHabitacion: "Selecciona una habitación:",
      noEntendi: "No entendí tu mensaje, ¿puedes reformularlo?",
      escribeReserva: "¿En qué puedo ayudarte? Puedes escribir 'reserva' para iniciar una reserva.",
      regresar: "← Regresar",
      enviar: "Enviar",
      placeholder: "Escribe tu mensaje..."
    },
    en: {
      saludo: "Hello! How can I help you?",
      deseaAlgoMas: "Would you like anything else? You can book another room or request information.",
      seleccionaCiudad: "Select a city:",
      seleccionaHotel: "Select a hotel:",
      seleccionaHabitacion: "Select a room:",
      noEntendi: "I didn't understand your message, can you rephrase?",
      escribeReserva: "How can I help you? Type 'book' to start a reservation.",
      regresar: "← Back",
      enviar: "Send",
      placeholder: "Type your message..."
    }
  };

  const sitiosPorCiudad = {
    cartagena: [
      {
        nombre: "Castillo de San Felipe",
        descripcion: "Fortaleza histórica con vistas panorámicas de la ciudad.",
        imagen: "/sitios/cartagena-castillo.jpg",
        ubicacion: "Cra. 17, Cartagena, Bolívar"
      },
      {
        nombre: "Ciudad Amurallada",
        descripcion: "Centro histórico con arquitectura colonial y calles coloridas.",
        imagen: "/sitios/cartagena-muralla.jpg",
        ubicacion: "Centro, Cartagena, Bolívar"
      }
    ],
    medellin: [
      {
        nombre: "Parque Arví",
        descripcion: "Reserva natural ideal para caminatas y picnic.",
        imagen: "/sitios/medellin-arvi.jpg",
        ubicacion: "Santa Elena, Medellín"
      },
      {
        nombre: "Plaza Botero",
        descripcion: "Plaza con esculturas del artista Fernando Botero.",
        imagen: "/sitios/medellin-botero.jpg",
        ubicacion: "Cra. 52 #52-43, Medellín"
      }
    ],
    "san andres": [
      {
        nombre: "Johnny Cay",
        descripcion: "Islote famoso por sus playas de arena blanca y aguas cristalinas.",
        imagen: "/sitios/sanandres-johnnycay.jpg",
        ubicacion: "Frente a la costa de San Andrés"
      },
      {
        nombre: "La Piscinita",
        descripcion: "Zona ideal para snorkel y nadar con peces de colores.",
        imagen: "/sitios/sanandres-piscinita.jpg",
        ubicacion: "Vía circunvalar, San Andrés"
      }
    ],
    "santa marta": [
      {
        nombre: "Parque Tayrona",
        descripcion: "Parque natural con playas paradisíacas y senderos ecológicos.",
        imagen: "/sitios/santamarta-tayrona.jpg",
        ubicacion: "Troncal del Caribe, Santa Marta"
      },
      {
        nombre: "Quinta de San Pedro Alejandrino",
        descripcion: "Lugar histórico donde murió Simón Bolívar.",
        imagen: "/sitios/santamarta-quinta.jpg",
        ubicacion: "Av. del Libertador, Santa Marta"
      }
    ]
  };

  const sitiosTuristicos = {
    es: [
      "¿me recomiendas sitios turisticos?",
      "lugares turisticos",
      "qué puedo visitar",
      "sitios turisticos",
      "recomiendame lugares para conocer",
      "qué hacer en la ciudad",
      "sugerencia de sitios turisticos",
      "que visitar",
      "sitios para visitar",
      "atracciones turisticas"
    ],
    en: [
      "suggest me tourist places",
      "tourist places",
      "what can I visit",
      "recommend me places to visit",
      "what to do in the city",
      "suggestion of tourist sites",
      "what to visit",
      "places to visit",
      "tourist attractions"
    ]
  };

    // const sugerenciasTuristicas = {
    //   es: "Algunas sugerencias de sitios turisticos: Plaza Central, Museo de Arte, Parque Natural, Centro Histórico y Mercado Local.",
    //   en: "Some suggestions for tourist places: Central Plaza, Art Museum, Natural Park, Historic Center, and Local Market."
    // };

  useEffect(() => {
    if (reservaFinalizada) {
      setMensajes(msgs => [
        ...msgs,
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].deseaAlgoMas }
      ]);
      setEstado("inicio");
      if (onResetReserva) onResetReserva();
    }
  }, [reservaFinalizada, idioma]);

  function handleSend() {
    const texto = normalizar(input.trim());
    if (!texto) return;

    // Saludos o información
    if (estado === "inicio" && saludosInfo.some(s => texto.includes(normalizar(s)))) {
      setMensajes([
        ...mensajes,
        { autor: "usuario", texto: input },
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].saludo }
      ]);
      setInput("");
      return;
    }

    // Sugerencia de sitios turísticos
    if (
      estado === "inicio" &&
      sitiosTuristicos[idioma as keyof typeof sitiosTuristicos].some((s: string) => texto.includes(normalizar(s)))
    ) {
    const ciudad = ciudadSeleccionada;
      if (!ciudad) {
        setMensajes([
          ...mensajes,
          { autor: "usuario", texto: input },
          { autor: "bot", texto: idioma === "es"
            ? "¿Para qué ciudad deseas ver sitios turísticos? Escribe el nombre de la ciudad (Cartagena, Medellín, San Andrés o Santa Marta)."
            : "For which city do you want to see tourist places? Type the city name (Cartagena, Medellín, San Andrés or Santa Marta)." }
        ]);
        setInput("");
        return;
      }
      const key = ciudad.trim().toLowerCase();
      const sitios = sitiosPorCiudad[key as keyof typeof sitiosPorCiudad];
      if (sitios && sitios.length > 0) {
        setMensajes([
          ...mensajes,
          { autor: "usuario", texto: input },
          {
            autor: "bot",
            texto: idioma === "es"
              ? "Selecciona un sitio turístico para ver más detalles:"
              : "Select a tourist site to see more details:",
            items: sitios.map((sitio) => ({
              tipo: "sitio",
              nombre: sitio.nombre,
              id: sitio.nombre,
              imagen: sitio.imagen,
              descripcion: sitio.descripcion,
              ubicacion: sitio.ubicacion
            }))
          }
        ]);
      } else {
        setMensajes([
          ...mensajes,
          { autor: "usuario", texto: input },
          { autor: "bot", texto: idioma === "es"
            ? "No tengo sitios turísticos registrados para esa ciudad."
            : "I don't have tourist places registered for that city." }
        ]);
      }
      setInput("");
      return;
    }

    // Detectar si el usuario escribe el nombre de una ciudad para mostrar sitios turísticos
    if (
      mensajes.length > 0 &&
      mensajes[mensajes.length - 1].autor === "bot" &&
      (
        mensajes[mensajes.length - 1].texto.includes("¿Para qué ciudad deseas ver sitios turísticos?") ||
        mensajes[mensajes.length - 1].texto.includes("For which city do you want to see tourist places?")
      )
    ) {
      const ciudad = Object.keys(sitiosPorCiudad).find(
        c => normalizar(texto) === normalizar(c)
      );
      if (ciudad) {
        const sitios = sitiosPorCiudad[ciudad as keyof typeof sitiosPorCiudad];
        setCiudadSeleccionada(ciudad);
        setMensajes([
          ...mensajes,
          { autor: "usuario", texto: input },
          {
            autor: "bot",
            texto: idioma === "es"
              ? "Selecciona un sitio turístico para ver más detalles:"
              : "Select a tourist site to see more details:",
            items: sitios.map((sitio) => ({
              tipo: "sitio",
              nombre: sitio.nombre,
              id: sitio.nombre,
              imagen: sitio.imagen,
              descripcion: sitio.descripcion,
              ubicacion: sitio.ubicacion
            }))
          }
        ]);
        setInput("");
        return;
      }
    }

    // Preguntas frecuentes (FAQ)
    const faqs = faq[idioma as keyof typeof faq];
    const match = faqs.find((f) =>
      normalizar(texto).includes(normalizar(f.pregunta))
    );
    if (estado === "inicio" && match) {
      setMensajes([
        ...mensajes,
        { autor: "usuario", texto: input },
        { autor: "bot", texto: match.respuesta }
      ]);
      setInput("");
      return;
    }

    // Reserva
    if (estado === "inicio" && reservas.some((s: string) => texto.includes(normalizar(s)))) {
      setMensajes([
        ...mensajes,
        { autor: "usuario", texto: input }
      ]);
      setMensajes(msgs => [
        ...msgs,
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].seleccionaCiudad, items: ciudades.map((c) => ({ tipo: "ciudad", ...c })) }
      ]);
      setEstado("ciudad");
      setInput("");
      return;
    }

    setMensajes([
      ...mensajes,
      { autor: "usuario", texto: input },
      { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].noEntendi }
    ]);
    setInput("");
  }

  function handleCiudad(id: string) {
    setCiudadSeleccionada(id);
    setMensajes(msgs => [
      ...msgs,
      { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].seleccionaHotel, items: hotelesPorCiudad[id].map((h) => ({ tipo: "hotel", nombre: h.nombre, id: h.id, imagen: h.imagen, descripcion: h.descripcion })) }
    ]);
    onShowHoteles(hotelesPorCiudad[id]);
    setEstado("hotel");
  }

  function handleHotel(id: string) {
    // setHotelSeleccionado(id); // Eliminar, no se usa
    setMensajes(msgs => [
      ...msgs,
      { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].seleccionaHabitacion, items: habitacionesPorHotel[id]?.map((h) => ({
        tipo: "habitacion",
        nombre: h.nombre,
        id: h.id,
        imagen: h.imagen,
        descripcion: h.descripcion,
        precio: h.precio,
        capacidad: h.capacidad,
        servicios: h.servicios
      })) || [] }
    ]);
    onShowHoteles([]);
    onShowHabitaciones(habitacionesPorHotel[id] || []);
    setEstado("habitacion");
  }

  function handleRegresar() {
    if (estado === "habitacion") {
      setEstado("hotel");
      setMensajes(msgs => [
        ...msgs,
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].seleccionaHotel, items: hotelesPorCiudad[ciudadSeleccionada!].map((h) => ({ tipo: "hotel", nombre: h.nombre, id: h.id, imagen: h.imagen, descripcion: h.descripcion })) }
      ]);
      onShowHabitaciones([]);
      onShowHoteles(hotelesPorCiudad[ciudadSeleccionada!]);
    } else if (estado === "hotel") {
      setEstado("ciudad");
      setMensajes(msgs => [
        ...msgs,
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].seleccionaCiudad, items: ciudades.map((c) => ({ tipo: "ciudad", ...c })) }
      ]);
      onShowHoteles([]);
    } else if (estado === "ciudad") {
      setEstado("inicio");
      setMensajes(msgs => [
        ...msgs,
        { autor: "bot", texto: traducciones[idioma as keyof typeof traducciones].escribeReserva }
      ]);
    }
  }

  return (
  <div
    className="fixed bottom-4 right-4 rounded-xl shadow-2xl w-80 p-4 border border-blue-200 z-50"
    style={{
      backgroundImage: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('/playa.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(255,255,255,0.15)"
    }}
  >
    <div className="h-64 overflow-y-auto mb-2">
      {mensajes.map((msg, i) => (
        <div key={i} className={msg.autor === "bot" ? "text-black-700 mb-2" : "text-gray-800 mb-2"}>
          <b>{msg.autor === "bot" ? "Bot" : "Tú"}:</b>{" "}
          <span dangerouslySetInnerHTML={{ __html: msg.texto.replace(/\n/g, "<br/>") }} />
          {msg.imagen && (
            <div className="my-2">
              <img src={msg.imagen} alt="sitio turístico" className="w-full h-32 object-cover rounded" />
            </div>
          )}
          {msg.items && (
            <div className="flex flex-col gap-2 mt-2">
              {/* Mostrar ciudades como botones */}
              {estado === "ciudad" && msg.items.filter(i => i.tipo === "ciudad").map((item, idx) => {
                const ciudad = item as CiudadItem;
                return (
                  <button
                    key={idx}
                    className="flex items-center gap-2 text-left border rounded p-1 hover:bg-blue-50"
                    onClick={() => handleCiudad(ciudad.id)}
                  >
                    {ciudad.imagen && (
                      <img src={ciudad.imagen} alt={ciudad.nombre} className="w-8 h-8 object-cover rounded" />
                    )}
                    <span>{ciudad.nombre}</span>
                  </button>
                );
              })}
              {/* Mostrar hoteles como botones */}
              {estado === "hotel" && msg.items.filter(i => i.tipo === "hotel").map((item, idx) => {
                const hotel = item as HotelItem;
                return (
                  <button
                    key={idx}
                    className="text-blue-600 underline text-left"
                    onClick={() => handleHotel(hotel.id)}
                  >
                    {hotel.nombre}
                  </button>
                );
              })}
              {/* Mostrar habitaciones con botón para agregar al carrito y calendario modal */}
              {estado === "habitacion" && (
                <React.Fragment>
                  {msg.items.filter(i => i.tipo === "habitacion").map((item, idx) => {
                    const habitacion = item as HabitacionItem;
                    return (
                      <CalendarioReservaHabitacion key={idx} habitacion={habitacion} />
                    );
                  })}
                </React.Fragment>
              )}




              {/* Mostrar solo el nombre de los sitios turísticos como botón */}
              {msg.items.filter(i => i.tipo === "sitio").map((item, idx) => {
                const sitio = item as Sitio;
                return (
                  <button
                    key={idx}
                    className="text-blue-600 underline text-left"
                    onClick={() => setSitioAmpliado(sitio)}
                    type="button"
                  >
                    {sitio.nombre}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="flex gap-2 mb-2">
      <button
        className={`px-2 py-1 rounded ${idioma === "es" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setIdioma("es")}
        type="button"
      >
        Español
      </button>
      <button
        className={`px-2 py-1 rounded ${idioma === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        onClick={() => setIdioma("en")}
        type="button"
      >
        English
      </button>
    </div>

    <div className="flex">
      <input
        className="flex-1 border rounded-l px-2 py-1"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        placeholder={traducciones[idioma as keyof typeof traducciones].placeholder}
      />
      <button className="bg-blue-600 text-black px-4 rounded-r" onClick={handleSend}>
        {traducciones[idioma as keyof typeof traducciones].enviar}
      </button>
    </div>

    {estado !== "inicio" && (
      <div className="mt-2 flex">
        <button
          className="bg-gray-200 text-black-800 px-3 py-1 rounded hover:bg-gray-300 w-full"
          onClick={handleRegresar}
          type="button"
        >
          {traducciones[idioma as keyof typeof traducciones].regresar}
        </button>
      </div>
    )}

    {/* Modal de sitio ampliado */}
    {sitioAmpliado && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div
          className="relative bg-white rounded-xl shadow-2xl p-8 max-w-lg w-96"
          style={{ minWidth: 320 }}
        >
          <button
            className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
            onClick={() => setSitioAmpliado(null)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <img src={sitioAmpliado.imagen} alt={sitioAmpliado.nombre} className="w-full h-64 object-cover rounded mb-4" />
          <div className="font-bold text-2xl mb-2">{sitioAmpliado.nombre}</div>
          <div className="text-gray-700 mb-2">{sitioAmpliado.descripcion}</div>
          <div className="text-gray-500 text-sm">📍 {sitioAmpliado.ubicacion}</div>
        </div>
      </div>
    )}

  </div>
  );
}

// --- COMPONENTE AUXILIAR FUERA DEL PRINCIPAL ---
type PropsCalendarioReservaHabitacion = {
  habitacion: {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    precio: string;
    capacidad: string;
    servicios: string[];
  };
};


// Permite pasar ciudad y hotel desde el contexto del chatbot
function CalendarioReservaHabitacion({ habitacion }: PropsCalendarioReservaHabitacion) {
  const [mostrarCalendario, setMostrarCalendario] = React.useState(false);
  const [fechaEntrada, setFechaEntrada] = React.useState("");
  const [fechaSalida, setFechaSalida] = React.useState("");
  const [error, setError] = React.useState("");

  // Buscar ciudad y hotel a partir de la habitación
  // Se asume que el componente principal tiene acceso a ciudades y hotelesPorCiudad
  // y que la ciudad seleccionada está en el contexto del chatbot
  // Para robustez, se busca el hotel y ciudad por la relación de IDs
  function handleAgregar() {
    if (!fechaEntrada || !fechaSalida) {
      setError("Selecciona ambas fechas");
      return;
    }
    if (fechaSalida <= fechaEntrada) {
      setError("La fecha de salida debe ser posterior a la de entrada");
      return;
    }
    setError("");

    // Buscar hotel y ciudad
    let hotel = null;
    let ciudad = null;
    // @ts-ignore
    const win = window as typeof window & { __HOTELES_POR_HAB?: Record<string, { hotel: string; ciudad: string }> };
    if (win.__HOTELES_POR_HAB) {
      const info = win.__HOTELES_POR_HAB[habitacion.id];
      if (info) {
        hotel = info.hotel;
        ciudad = info.ciudad;
      }
    }

    // Emitir evento personalizado con ciudad y hotel si se encuentran
    const event = new CustomEvent("agregarAlCarrito", {
      detail: {
        ...habitacion,
        fechaEntrada,
        fechaSalida,
        ciudad,
        hotel
      }
    });
    window.dispatchEvent(event);
    setMostrarCalendario(false);
    setFechaEntrada("");
    setFechaSalida("");
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-800">{habitacion.nombre}</span>
      <button
        className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
        onClick={() => setMostrarCalendario(true)}
        type="button"
      >
        Agregar al carrito
      </button>
      {mostrarCalendario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative bg-white rounded-xl shadow-2xl p-6 w-80 flex flex-col gap-3">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
              onClick={() => setMostrarCalendario(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="font-bold text-lg mb-2">Selecciona fechas para reservar</div>
            <label className="text-sm">Fecha de entrada:
              <input type="date" className="block border rounded px-2 py-1 mt-1 w-full" value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </label>
            <label className="text-sm">Fecha de salida:
              <input type="date" className="block border rounded px-2 py-1 mt-1 w-full" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} min={fechaEntrada || new Date().toISOString().split('T')[0]} />
            </label>
            {error && <div className="text-red-500 text-xs">{error}</div>}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
              onClick={handleAgregar}
              type="button"
            >
              Confirmar y agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

