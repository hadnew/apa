/**
* By ArifzynXD
* Minimal Kalo ReUpload Creadit 
* Mau Hapus Ini ? Jan Di Haous Minimal 
* Cantum Ajah Di Sini Nama Lu Kont 
* 
*            By ArifzynXD
*          
* WhatsApp : https://wa.me/62895347198105
*
**/

"use strict";
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@adiwajshing/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { JadiAnime } = require('jadianime-ts') 
// Database
const setting = JSON.parse(fs.readFileSync('./setting.json'));
const { host, application, serverCreate } = setting
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(Arifzyn, msg, m, setting, store) => {
try {
let { ownerNumber, botName } = setting
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
var chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
if (chats == undefined) { chats = '' }
const prefix = /^[°•π÷×¶∆£¢€�®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€�®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${setting.ownerNumber}`,"6285791220179@s.whatsapp.net","6285806240904@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const ownerNomer = setting.ownerNumber
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = Arifzyn.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await Arifzyn.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList
const footer = "By ArifzynXD"
function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = Arifzyn.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = Arifzyn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

async function toAnime(path) {
    try {
        let options = {
            proxy: "socks5://172.105.247.104:8080",
            qqmode: 'china'
        }
        let image = await JadiAnime(path, options)
        console.log(image)
    } catch (e) {
        console.log(e)
    }
}

const reply = (teks) => {Arifzyn.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await Arifzyn.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
Arifzyn.groupParticipantsUpdate(from, [sender], "remove")
}
}

// Response Addlist
if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
Arifzyn.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
Arifzyn.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: msg
})
}
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return Arifzyn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `https://arifzynstore.my.id`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;RamaaBot,;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: 'https://telegra.ph/file/3c485ff201d9337be14ef.jpg' }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

// Casenya
switch(command) {
	case 'helptes':
	case 'menutes':{
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${setting.ownerName}`
	let menu = `INFORMATION

Owner : @62895347198105
Website : arifzynstore.my.id
Instagram : @ArifzynXD19
𝗛𝗼𝘀𝘁 : Panel

𝗟𝗶𝘀𝘁 𝗠𝗲𝗻𝘂

.mainmenu
.ownermenu
.grupmenu
.listproduk
.website
.owner
.donasi
`
let btn_menu = [
{buttonId: '#listproduk', buttonText: {displayText: '𝗟𝗜𝗦𝗧 𝗣�𝗢𝗗𝗨𝗞️'}, type: 1},
{buttonId: '#mainmenu', buttonText: {displayText: '️𝗠𝗔𝗜� 𝗠𝗘�𝗨'}, type: 1},
{buttonId: '#website', buttonText: {displayText: '️𝗪𝗘𝗕𝗦𝗜𝗧𝗘'}, type: 1},

]
Arifzyn.sendMessage(from, {text: menu, buttons: btn_menu, footer: footer_nya, mentions: [setting.ownerNumber, sender]}, {quoted: fkontak})
}
break
case 'buypanel':{
if (!q) {
let sections = [{
title: "-- LIST HARGA PANEL --",
rows: [
{ title: 'RAM 1GB CPU 25%', rowId: prefix+'buypanel 1', description: 'Rp10.000/Bulan' },
{ title: 'RAM 2GB CPU 50%', rowId: prefix+'buypanel 2', description: 'Rp15.000/Bulan' },
{ title: 'RAM 3GB CPU 75%', rowId: prefix+'buypanel 3', description: 'Rp20.000/Bulan' },
{ title: 'RAM 4GB CPU 100%', rowId: prefix+'buypanel 4', description: 'Rp25.000/Bulan' },
{ title: 'RAM 5GB CPU 130%', rowId: prefix+'buypanel 5', description: 'Rp30.000/Bulan' },
{ title: 'RAM 6GB CPU 150%', rowId: prefix+'buypanel 6', description: 'Rp35.000/Bulan' },
{ title: 'RAM 7GB CPU 175%', rowId: prefix+'buypanel 7', description: 'Rp40.000/Bulan' },
{ title: 'RAM 8GB CPU 200%', rowId: prefix+'buypanel 8', description: 'Rp45.000/Bulan' },
{ title: 'RAM UNLIMITED CPU UNLIMITED', rowId: prefix+'buypanel 9', description: 'Rp60.000/Bulan' }
]
}]
let templateMessage = {
text: 'Berikut list harga panel\nYang kami sediakan.',
footer: footer,
title: '*LIST HARGA PANEL*',
buttonText: 'LIST HARGA',
sections
}
Arifzyn.sendMessage(from, templateMessage, { quoted: msg })
}
if (/1/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp10.000\n*RAM:* 1GB\n*CPU:* 25%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/2/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp15.000\n*RAM:* 2GB\n*CPU:* 50%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/3/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp20.000\n*RAM:* 3GB\n*CPU:* 75%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/4/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp25.000\n*RAM:* 4GB\n*CPU:* 100%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/5/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp30.000\n*RAM:* 5GB\n*CPU:* 130%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/6/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp35.000\n*RAM:* 6GB\n*CPU:* 150%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/7/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp40.000\n*RAM:* 7GB\n*CPU:* 175%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/8/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp45.000\n*RAM:* 8GB\n*CPU:* 200%\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
if (/9/.test(q)) {
reply('Pesanan anda telah terkirim ke owner bot tunggu 1-10 menit nanti juga ada yang chat.')
Arifzyn.sendMessage(ownerNomer+'@s.whatsapp.net', { text: `*ADA YANG ORDER PANEL NIHH*\n\n*PAKET:* Rp60.000\n*RAM:* Unlimited\n*CPU:* Unlimited\n*DARI:* @${sender.split('@')[0]}`, mentions: [sender]}, { quoted: msg })
}
}
break
case 'help':
case 'menu':{
let own = "62895347198105@s.whatsapp.net"
let listm = `\`\`\`LIST MENU\`\`\`

INFORMATION 

OWNER : @${own.split("@")[0]}
WEBSITE : arifzynstore.my.id
INSTAGRAM : @ArifzynXD19
HOST : Panel`
const sections = [
   {
     title: "List MENU", 
     rows: [
     { title: "PANEL MENU", rowId: ".panelmenu" },
     { title: "MAIN MENU", rowId: ".mainmenu" },
     { title: "OWNER MENU", rowId: ".ownermenu" },
     { title: "GROUP MENU", rowId: ".grupmenu" },
     { title: "LIST PRODUK", rowId: ".listproduk" }
     ]
    }
   ]
const listMessage = {
  text: listm, 
  footer: "ArifzynXD SHOP",
  mentions: [own],
  title: "", 
  buttonText: "Click Here",
  sections
}
Arifzyn.sendMessage(from, listMessage, { quoted: fkontak }) 
}
break
case 'panelmenu': {
let pmenu = `
 *PANEL MENU*
 
- ${prefix}addusr
- ${prefix}delusr
- ${prefix}listusr
- ${prefix}detusr
- ${prefix}addsrv
- ${prefix}delsrv
- ${prefix}listsrv
- ${prefix}detsrv
- ${prefix}updatesrv
 `
 reply(pmenu)
}
break 
case 'mainmenu':{
	let menu = `
 *MAIN MENU*

 .produk
 .listproduk
 .donasi
 .ping
 .test
 .pembayaran 
 .bayar
 .website
`
Arifzyn.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'grupmenu':{
	let menu = `
 *GROUP MENU*

 .hidetag
 .group open
 .group close 
 .antilink on
 .antilink off
 .kick 
 .addlist
 .dellist
 .list
 .shop
 .hapuslist
`
Arifzyn.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'ownermenu':{
	let menu = `
 *OWNER MENU*

 .join
 .block
 .unblock
 .hidetag
 .antilink
`
Arifzyn.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'jadianime':
let res = await jadiAnime(fs.readFileSync('./gambar/image.jpg'))
console.log(res)
break
case 'listproduk':
case 'produk':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${setting.ownerName}`
let tampilan_nya = `𝗟𝗜𝗦𝗧 𝗣�𝗢𝗗𝗨𝗞


LIST PRODUK KAMI
`
Arifzyn.sendMessage(from,
{text: tampilan_nya,
buttonText: "List Produk",
sections: [{title: "━━━━━━━━━━━━[ 𝗧𝗢𝗣 𝗨𝗣 ]━━━━━━━━━━━━",
rows: [
{title: "FIREE FIRE", rowId: prefix+"ff", description: "Menampilkan List Topup Free fire"},
{title: "MOBILE LEGENDS", rowId: prefix+"ml", description: "Menampilkan List Topup ML"},
{title: "𝗣𝗨𝗕𝗚 𝗠𝗢𝗕𝗜𝗟𝗘", rowId: prefix+"pubg", description: "Menampilkan List Pubg Mobile"},
{title: "CHIPS DOMINO", rowId: prefix+"chips", description: "Menampilkan List Chips Domino"}]},
{title: "━━━━━━━━━━━━[ MENU ]━━━━━━━━━━━━",
rows: [
{title: "DONASI", rowId: prefix+"donasi", description: "Donasi Kepada Bot"},
{title: "YOUTUBE", rowId: prefix+"yt", description: "YouTube Admin"},
{title: "GROUP", rowId: prefix+"gc", description: "Group Admin"},
{title: "WEBSITE", rowId: prefix+"scbot", description: "Website Resmi https://arifzynstore.my.id"}]},
],
footer: footer_nya,
mentions:[setting.ownerNumber, sender]}, { quoted :msg })
}
break
case 'owner':{
var owner_Nya = setting.ownerNumber
sendContact(from, owner_Nya, setting.ownerName, msg)
reply('*Owner Bot || ArifzynXD*')
}
break
case 'yt':
case 'youtube':
	Arifzyn.sendMessage(from, 
{text: `Youtube Owner
*Link* : https://youtube.com/@ItsMeArifzynXD`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	Arifzyn.sendMessage(from, {text: ` Instagram \n\nLink https://instagram.com/ArifzynXD19`},
{quoted: msg})
break
case 'gc':
case 'group':
case 'grup':
case 'groupadmin':
	Arifzyn.sendMessage(from, 
{text: `*GROUP OFFICIAL*\n
Group : https://chat.whatsapp.com/CTCi5c7jMfSHhBAVKBe3hR`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* 0895347198105
- *Gopay :* 082112309624
- *Saweria :* https://saweria.co/Arifzyn
- *Qris :* pending

arifzynstore.my.id
`
Arifzyn.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await Arifzyn.groupAcceptInvite(ini_urrrl)
reply('*Sukses Join The Group..*')
}
break
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* 0895347198105
- *Gopay :* 082112309624
- *Qris :* Pending

© arifzynstore.my.id 
`
Arifzyn.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${setting.ownerName} © 2022`},
{quoted: msg})
}
break
case 'ml':
case 'mobilelegend':{
let teq =`𝗠𝗢𝗕𝗜𝗟𝗘 𝗟𝗘𝗚𝗘�𝗗 ( 𝗜𝗗 )
💎86 Rp19.500
💎172 Rp38.000
💎257 Rp56.600
💎344 Rp74.000
💎429 Rp93.400
💎514 Rp110.600
💎600 Rp138.000
💎706 Rp158.000
💎878 Rp197.000
💎963 Rp217.000
💎1050 Rp236.000
💎1220 Rp276.000
💎1412 Rp316.000
💎1669 Rp375.000
💎1926 Rp434.000
💎2195 Rp474.000
💎2539 Rp553.000
💎2901 Rp633.000
💎3073 Rp672.000
💎3688 Rp792.000
💎4032 Rp871.000
💎4394 Rp950.000
💎5100 Rp1.108.000
💎5532 Rp1.189.000
💎6238 Rp1.347.000
💎7727 Rp1.664.000
💎9288 Rp1.977.000

𝗟𝗲𝗯𝗶𝗵 𝗠𝘂𝗿𝗮𝗵 𝗸𝗲 : arifzynstore.my.id
❗𝗢�𝗗𝗘�𝗔� 𝗔𝗞𝗔� 𝗗𝗜 𝗣�𝗢𝗦𝗘𝗦 𝗦𝗘𝗧𝗘𝗟𝗔𝗛 𝗣𝗘𝗠𝗕𝗔𝗬𝗔�𝗔�
`
let btn_menu = [
{buttonId: `${prefix}chat`, buttonText: { displayText: '𝗕𝗨𝗬’' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: teq,
buttons: btn_menu},
{quoted: msg})
}
break
case 'ff':
case 'freefire':{
let teq =`𝗙�𝗘𝗘 𝗙𝗜�𝗘 ( 𝗜𝗗 )
💎70 Rp9.150
💎140 Rp19.000
💎250 Rp31.500
💎355 Rp43.500
💎500 Rp61.000
💎635 Rp77.200
💎720 Rp85.500
💎1000 Rp127.500

𝗟𝗲𝗯𝗶𝗵 𝗠𝘂𝗿𝗮𝗵 𝗸𝗲 : arifzynstore.my.id
𝗕𝗨𝗬 𝗧𝗔�𝗣𝗔 𝗕𝗨𝗞𝗧𝗜 𝗧�𝗔�𝗦𝗙𝗘� 𝗧𝗜𝗗𝗔𝗞 𝗔𝗞𝗔� 𝗗𝗜 𝗣�𝗢𝗦𝗘𝗦
`
let btn_menu = [
{buttonId: `${prefix}chat`, buttonText: { displayText: '𝗢�𝗗𝗘�' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: teq,
buttons: btn_menu},
{quoted: msg})
}
break
case 'pubg':
case 'pubgm':{
let teq =`𝗣𝗨𝗕𝗚 𝗠𝗢𝗕𝗜𝗟𝗘 ( 𝗜𝗗 )
💎
💎
💎
💎
💎
💎
💎
💎

𝗟𝗲𝗯𝗶𝗵 𝗠𝘂𝗿𝗮𝗵 𝗸𝗲 : arifzynstore.my.id
`
let btn_menu = [
{buttonId: `${prefix}chat`, buttonText: { displayText: '𝗢�𝗗𝗘�' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: teq,
buttons: btn_menu},
{quoted: msg})
}
break
case 'chat':
case 'chat':{
let teq =`text di sini

`
let btn_menu = [
{buttonId: `${prefix}kKK`, buttonText: { displayText: '𝗢𝗞𝗘' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: teq,
buttons: btn_menu},
{quoted: msg})
}
break
case 'chips':
case 'chipsdomino':{
let teq =`
CHIPS DOMINO ( 𝗜𝗗 )
100M🪙6.500
200M🪙13.000
300M🪙19.500
400M🪙26.500
500M🪙32.500
600M🪙39.000
700M🪙45.500
800M🪙52.500
900M🪙58.500


*Jika setuju untuk membeli*
Klik button di bawah!!`
let btn_menu = [
{buttonId: `${prefix}chat`, buttonText: { displayText: '𝗢�𝗗𝗘�' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: teq,
buttons: btn_menu},
{quoted: msg})
}
break
case 'p':
case 'proses':{
let tek = (`「 TRANSAKSI PENDING 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*\n*Atau Chat : Wa.me//6285692287644`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: '𝗜𝗻𝘁𝗮𝗻𝗽𝗲𝗱𝗶𝗮.𝗺𝘆.𝗶𝗱' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: tek,
buttons: btn_menu})
Arifzyn.sendMessage(`${setting.ownerNumber}`, {text: `*𝗢𝗿𝗱𝗲𝗿*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'd':
case 'done':{
if (!isOwner && !fromMe) return reply('Ngapain..?')
let tek = (`「 TRANSAKSI SUKSES 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *intanpedia*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: '𝗢𝗞𝗘' }, type: 1 },
]
Arifzyn.sendMessage(from,
{text: tek,
buttons: btn_menu})
}
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
Arifzyn.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
Arifzyn.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
Arifzyn.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
Arifzyn.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
Arifzyn.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await Arifzyn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await Arifzyn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop': case 'list':
if (!isGroup) return reply(mess.OnlyGrup)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: x.key
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'click here',
footer: `*list from ${groupName}*`,
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
Arifzyn.sendMessage(from, listMsg)
break
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa`)
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
var listMsg = {
text: `Hai @${sender.split("@")[0]}`,
buttonText: 'pilih disini',
footer: 'Silahkan pilih list yg mau dihapus',
mentions: [sender],
sections: [{
title: groupName, rows: arr_rows
}]
}
Arifzyn.sendMessage(from, listMsg)
}
break
case 'web':
case 'website':
case 'webs':
case 'websitestore':{
let teq =`*----- 𝗪𝗘𝗕𝗦𝗜𝗧𝗘 𝗦𝗧𝗢�𝗘  -----*

𝗗𝗔𝗣𝗔𝗧𝗞𝗔� 𝗛𝗔�𝗚𝗔 𝗟𝗘𝗕𝗜𝗛 𝗠𝗨�𝗔𝗛
intanpedia.my.id
`
Arifzyn.sendMessage(from,
{text: teq},
{quoted: msg})
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
// panel
case 'addusr':{
if (!isOwner) return reply(mess.OnlyOwner)
let s = q.split(',')
let email = s[0]
let username = s[1]
let nomor = s[2]
if (!email) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!username) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Email,Username,@tag/nomor\n\nContoh :\n${prefix+command} example@gmail.com,example,@user`)
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let d = (await Arifzyn.onWhatsApp(nomornya.split('@')[0]))[0] || {}
let psswd = d.exists ? require("crypto").randomBytes(5).toString('hex') : username+'662389'
let f = await fetch(host + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
"password": psswd
})
})
let res = await f.json();
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2));
Arifzyn.sendMessage(from, { text: `*SUCCESSFULLY ADD USER*\n\n*TYPE:* user\n\n*ID:* ${res.attributes.id}\n*UUID:* ${res.attributes. uuid}\n*USERNAME:* ${res.attributes.username}\n*EMAIL:* ${res.attributes.email}\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n*CREATED AT:* ${res.attributes.created_at}\n\n*Password telah dikirim ke @${nomornya.split('@')[0]}*`, mentions: [nomornya]}, { quoted: msg })
Arifzyn.sendMessage(nomornya, { text: `*DONE PANEL BY ArifzynXD*\n\n*ID:* ${res.attributes.id}\n*UUID:* ${res.attributes. uuid}\n*USERNAME:* ${res.attributes.username}\n*EMAIL:* ${res.attributes.email}\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n*CREATED AT:* ${res.attributes.created_at}\n*PASSWORD:* ${psswd}\n*LOGIN:* ${host}\n\n*NOTE*\n_*Bot* atau *ArifzynXD* tidak akan mengirim kedua kali,_\n_Jadi simpan baik baik atau di ingat._\n\n#TERIMAKASIH` })
}
break
case 'delusr':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} userId\n\nContoh :\n${prefix+command} 2`)
let f = await fetch(host + "/api/application/users/" + q, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE USER*')
}
break

case 'listusr':{
if (!isOwner) return reply(mess.OnlyOwner)
let page = q ? q : '1'
let f = await fetch(host + "/api/application/users?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
let users = res.data
let sections = []
for (let user of users) {
let u = user.attributes
let obj = {
title: "-- ArifzynXD SHOP --",
rows: [
{ title: `${u.id}. ${u.username}`, rowId: `${prefix}detusr ` + u.id, description: u.first_name + ' ' + u.last_name },
]
}
await sections.push(obj)
if (sections.length === 50) {
sections.push({
title: "--- ArifzynXD SHOP --",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listusr 2`, description: 'Page 2' },
]
})
}
}
await Arifzyn.sendMessage(from, {
text: "Berikut list user *ArifzynXD SHOP*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*ArifzynXD SHOP*",
buttonText: `${res.meta.pagination.count} Users`,
sections
}, { quoted: msg })
}
break

case 'detusr':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} userId\n\nContoh :\n${prefix+command} 1`)
let f = await fetch(host + "/api/application/users/" + q, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json()
if (res.errors) return reply('*USER NOT FOUND*')
reply(`*${res.attributes.username.toUpperCase()} USER DETAILS*\n\n*ID:* ${res.attributes.id}\n*USERNAME:* ${res.attributes.username}\n*EMAIL:* ${res.attributes.email}\n*FIRST NAME/LAST NAME:* ${res.attributes.first_name}/${res.attributes.last_name}\n*LANGUAGE:* ${res.attributes.language}\n*IS ADMIN:* ${res.attributes.root_admin}\n*IS 2FA:* ${res.attributes["2fa"]}\n*CREATED AT:* ${res.attributes.created_at}\n*UPDATE AT:* ${res.attributes.updated_at}\n*UUID:* ${res.attributes.uuid}`)
}
break

case 'addsrv':{
if (!isOwner) return reply(mess.OnlyOwner)
let s = q.split(',')
let name = s[0]
let userId = s[1]
let eggId = s[2]
let locId = s[3]
let memory = s[4]
let disk = s[5]
let cpu = s[6]
if (!name) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!userId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!eggId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!locId) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!memory) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!disk) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
if (!cpu) return reply(`Ex : ${prefix+command} name,userId,eggId,locationId,ram,disk,cpu\n\nContoh :\n${prefix+command} Example,1,15,1,1024,10240,100`)
let f1 = await fetch(host + "/api/application/nests/5/eggs/" + eggId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json();
let eggs = data.attributes

let f = await fetch(host + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
},
"body": JSON.stringify({
"name": name,
"description": "",
"user": parseInt(userId),
"egg": parseInt(eggId),
"docker_image": eggs.docker_image,
"startup": eggs.startup,
"environment": serverCreate.eggs.environment,
"limits": {
"memory": memory,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
},
deploy: {
locations: [parseInt(locId)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
reply(`*SUCCESSFULLY ADD SERVER*\n\n*TYPE: server*\n\n*NAME:* ${res.attributes.name}\n*ID:* ${res.attributes.id}\n*IDENTIFIER:* ${res.attributes.identifier}\n*UUID:* ${res.attributes.uuid}\n*RAM:* ${res.attributes.limits.memory === 0 ? 'UNLIMITED' : res.attributes.limits.memory} MB\n*DISK:* ${res.attributes.limits.disk === 0 ? 'UNLIMITED' : res.attributes.limits.disk} MB\n*CPU:* ${res.attributes.limits.cpu === 0 ? 'UNLIMITED' : res.attributes.limits.cpu}%\n*CREATED AT:* ${res.attributes.created_at}`)
}
break

case 'delsrv':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} serverId\n\nContoh :\n${prefix+command} 9`)
let f = await fetch(host + "/api/application/servers/" + q, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return reply('*SERVER NOT FOUND*')
reply('*SUCCESSFULLY DELETE THE SERVER*')
}
break

case 'listsrv': {
if (!isOwner) return reply(mess.OnlyOwner)
let page = q ? q : '1'
let f = await fetch(host + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
let servers = res.data
let sections = []
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(host + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.c_api_key
}
})
let data = await f3.json();
let obj = {
title: "-- ArifzynXD SHOP --",
rows: [
{ title: `${s.id}. ${s.name}`, rowId: `${prefix}detsrv ` + s.id, description: `Status: ${data.attributes ? data.attributes.current_state : s.status}` },

]
}
await sections.push(obj)
if (sections.length >= 50 && res.meta.pagination.links.next) {
sections.push({
title: "-- ArifzynXD SHOP --",
rows: [
{ title: `⏩ NEXT`, rowId: `${prefix}listsrv 2`, description: 'Page 2' },
]
})
}
}
await Arifzyn.sendMessage(from, {
text: "Berikut list server *ArifzynXD SHOP*",
footer: `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}`,
title: "*ArifzynXD SHOP*",
buttonText: `${res.meta.pagination.count} Servers`,
sections
}, { quoted: msg })
}
break

case 'detsrv': {
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} serverId\n\nContoh :\n${prefix+command} 1`)
let f = await fetch(host + "/api/application/servers/" + q, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let res = await f.json();
if (res.errors) return reply('*SERVER NOT FOUND*')
let s = res.attributes
let f2 = await fetch(host + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.c_api_key
}
})
let data = await f2.json();
let t = data.attributes
reply(`*${s.name.toUpperCase()} SERVER DETAILS*\n\n*STATUS:* ${t.current_state}\n\n*ID:* ${s.id}\n*UUID:* ${s.uuid}\n*NAME:* ${s.name}\n*DESCRIPTION:* ${s.description}\n*RAM:* ${await (format(t.resources.memory_bytes)).toString()} / ${s.limits.memory === 0 ? 'UNLIMITED' : s.limits.memory + 'MB'}\n*DISK:* ${await (format(t.resources.disk_bytes)).toString()} / ${s.limits.disk === 0 ? 'UNLIMITED' : s.limits.disk + 'MB'}\n*CPU:* ${t.resources.cpu_absolute}% / ${s.limits.cpu === 0 ? 'UNLIMITED' : s.limits.cpu + '%'}\n*CREATED AT:* ${s.created_at}\n*UPDATED AT:* ${s.updated_at}`)
}
break

case 'updatesrv':{
if (!isOwner) return reply(mess.OnlyOwner)
let s = q.split(',')
let serverId = s[0]
let memory = s[1]
let disk = s[2]
let cpu = s[3]
if (!serverId) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!memory) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!disk) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
if (!cpu) return reply(`Ex : ${prefix+command} serverId,ram,disk,cpu\n\nContoh :\n${prefix+command} 1,1024,10240,100`)
let f1 = await fetch(host + "/api/application/servers/" + serverId, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
}
})
let data = await f1.json()

let f = await fetch(host + "/api/application/servers/" + serverId + "/build", {
"method": "PATCH",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + application.api_key
},
"body": JSON.stringify({
"allocation": data.attributes.allocation,
"memory": memory || data.attributes.limits.memory,
"swap": data.attributes.limits.swap || 0,
"disk": disk || data.attributes.limits.disk,
"io": 500,
"cpu": cpu || data.attributes.limits.cpu,
"threads": null,
"feature_limits": {
"databases": serverCreate.limits.db,
"backups": serverCreate.limits.backups,
"allocations": serverCreate.limits.allocation
}
})
})
let res = await f.json()
if (res.errors) return reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
reply(`*SUCCESSFULLY UPDATED THE SERVER*\n\n*TYPE:* ${res.object}\n\n*ID:* ${server.id}\n*UUID:* ${server.uuid}\n*NAME:* ${server.name}\n*DESCRIPTION:* ${server.description}\n*RAM:* ${server.limits.memory === 0 ? 'UNLIMITED' : server.limits.memory} MB\n*DISK:* ${server.limits.disk === 0 ? 'UNLIMITED' : server.limits.disk} MB\n*CPU:* ${server.limits.cpu === 0 ? 'UNLIMITED' : server.limits.cpu}%\n*CREATED AT:* ${server.created_at}\n*UPDATED AT:* ${server.updated_at}`)
}
break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
Arifzyn.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
Arifzyn.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
Arifzyn.sendMessage(setting.ownerNumber, {text:errny, mentions:[sender]})
}}