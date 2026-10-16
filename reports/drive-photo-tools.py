from pathlib import Path
import json, re
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT/'work'/'drive-food-observations.json').read_text(encoding='utf-8-sig'))
assets = {a['url']:a for a in DATA['bundle']['assets']}
photos = DATA['photos']
source_paths={p['name']:assets[p['src']]['path'] for p in photos}
if (ROOT/'work'/'drive-food-direct.json').exists():
    direct=json.loads((ROOT/'work'/'drive-food-direct.json').read_text(encoding='utf-8-sig'))
    existing_names={p['name'] for p in photos}
    for p in direct:
        source_paths[p['name']]=p['path']
        if p['name'] not in existing_names:
            photos.append(p)
sheet=Image.new('RGB',(1500, ((len(photos)+4)//5)*285), '#faf8f5')
draw=ImageDraw.Draw(sheet)
for i,p in enumerate(photos):
    pic=ImageOps.exif_transpose(Image.open(source_paths[p['name']])).convert('RGB')
    thumb=ImageOps.contain(pic,(280,245))
    x=(i%5)*300+10; y=(i//5)*285
    sheet.paste(thumb,(x,y))
    draw.text((x,y+248),p['name'],fill='black')
    draw.text((x,y+267),f'{pic.width} x {pic.height}',fill='black')
sheet.save(ROOT/'reports'/'drive-food-contact-sheet.jpg',quality=90)
print(f'{len(photos)} Drive photos inspected structurally')

MAPPINGS = {
    'CHINGADA TACO.png': ('chingada-taco','Chingada Taco'),
    'CHORIZO TACO.png': ('chorizo-taco','Chorizo Taco'),
    'BURRITO.png': ('burrito','Burrito'),
    'CARNITAS TACO.png': ('carnitas-taco','Carnitas Taco'),
    'CHIPS AND SALSA.png': ('chips-salsa','Chips & Salsa'),
    'GUACAMOLE BOWL.png': ('guacamole-bowl','Guacamole Bowl'),
    'MUSHROOM.png': ('mushroom-taco','Mushroom Taco'),
    'NACHOS.png': ('nachos','Nachos'),
    'POTATOES.png': ('mexican-potatoes','Mexican Potatoes'),
    'QUESO FUNDIDO.png': ('queso-fundido','Queso Fundido'),
    'SWEET POT.png': ('sweet-potato-taco','Sweet Potato Taco'),
    'Taco Bowl.png': ('taco-bowl','Taco Bowl'),
    'Mole 2.png': ('mole-con-pollo','Mole con Pollo'),
    'Michelada.png': ('michelada','Michelada'),
    'TINGA.png': ('tinga-de-pollo-taco','Tinga de Pollo Taco'),
    'TRES LECHE.png': ('tres-leches-cake','Tres Leches Cake'),
    'Signature Marg.png': ('signature-margarita',None),
}
REUSED = {'BARBACOA TACO.png': ('Barbacoa Taco','/images/optimized/barbacoa-taco-600.webp')}
CONDITIONAL = {'CHURROS.png': ('Churro Bites','Short curved miniature churros, not visibly cut into bites; confirm the current serving style before mapping.')}
manifest=[]
for p in photos:
    src=ImageOps.exif_transpose(Image.open(source_paths[p['name']])).convert('RGB')
    drive_id_match=re.search(r'/d/([^=/?]+)',p.get('src',''))
    drive_id=drive_id_match.group(1) if drive_id_match else p.get('driveId')
    source_url=f'https://drive.google.com/file/d/{drive_id}/view' if drive_id else 'https://drive.google.com/drive/folders/1RpDcjtnv1z_0IgnNRFEF0l5mBXk-MSkF'
    entry={'sourceFilename':p['name'],'driveId':drive_id,'sourceUrl':source_url,'sourceWidth':src.width,'sourceHeight':src.height,'proposedMatchingDish':None,'assetPath':None,'status':'not on current menu'}
    if p['name'] in MAPPINGS:
        slug,dish=MAPPINGS[p['name']]
        width=min(600,src.width); height=round(src.height*width/src.width)
        pic=src.resize((width,height),Image.Resampling.LANCZOS) if width!=src.width else src
        dest=ROOT/'public'/'images'/'menu'/f'{slug}-{width}.webp'
        dest.parent.mkdir(parents=True,exist_ok=True)
        pic.save(dest,'WEBP',quality=86,method=6)
        entry.update({'proposedMatchingDish':dish,'assetPath':'/'+dest.relative_to(ROOT/'public').as_posix(),'width':width,'height':height,'bytes':dest.stat().st_size,'status':'matched'})
        if p['name']=='Signature Marg.png':
            entry.update({'status':'generic margarita photo','category':'Margaritas','note':'Filename confirms a signature margarita; the exact recipe is unconfirmed. Use for the bar or Margarita Monday, not a named variation.'})
        print(f"{entry['assetPath']}: {width}x{height}, {round(entry['bytes']/1024)} KB")
    elif p['name'] in REUSED:
        dish,path=REUSED[p['name']]
        entry.update({'proposedMatchingDish':dish,'assetPath':path,'status':'reuse existing verified photo'})
    elif p['name'] in CONDITIONAL:
        dish,note=CONDITIONAL[p['name']]
        entry.update({'proposedMatchingDish':dish,'status':'confirmation required','note':note})
    elif p['name']=='burrito.png':
        entry.update({'proposedMatchingDish':'Burrito','status':'alternate crop not exported','note':'The square uppercase BURRITO.png is used for consistent menu framing.'})
    elif p['name'].startswith('DSC_'):
        entry.update({'status':'unidentified dish, unassigned'})
    manifest.append(entry)
if (ROOT/'work'/'drive-craft-photos.json').exists():
    craft=json.loads((ROOT/'work'/'drive-craft-photos.json').read_text(encoding='utf-8-sig'))
    craft_settings={'DSC_0155.jpg':('tortilla-stack',[640,960],'Fresh La Chingada corn tortillas stacked after cooking'), 'DSC_0167.jpg':('tortillas-on-griddle',[640,960,1440],'La Chingada corn tortillas cooking across the griddle')}
    craft_sheet=Image.new('RGB',(1200,460),'#faf8f5')
    craft_draw=ImageDraw.Draw(craft_sheet)
    for i,p in enumerate(craft):
        if p['name'] not in craft_settings:
            continue
        source=ImageOps.exif_transpose(Image.open(p['path'])).convert('RGB')
        slug,widths,alt=craft_settings[p['name']]
        outputs=[]
        for width in widths:
            width=min(width,source.width)
            height=round(source.height*width/source.width)
            resized=source.resize((width,height),Image.Resampling.LANCZOS)
            dest=ROOT/'public'/'images'/'craft'/f'{slug}-{width}.webp'
            dest.parent.mkdir(parents=True,exist_ok=True)
            resized.save(dest,'WEBP',quality=86,method=6)
            outputs.append({'path':'/'+dest.relative_to(ROOT/'public').as_posix(),'width':width,'height':height,'bytes':dest.stat().st_size})
            print(f"{outputs[-1]['path']}: {width}x{height}, {round(outputs[-1]['bytes']/1024)} KB")
        manifest.append({'sourceFilename':p['name'],'driveId':p.get('driveId'),'sourceUrl':'https://drive.google.com/drive/folders/1Xd30njUpTcjPrZBQ0JTWl0nkz9yu57Xe','sourceWidth':source.width,'sourceHeight':source.height,'proposedMatchingDish':None,'status':'kitchen craft photo','alt':alt,'outputs':outputs})
        thumb=ImageOps.contain(source,(580,400))
        craft_sheet.paste(thumb,(i*600+10,0))
        craft_draw.text((i*600+10,410),p['name'],fill='black')
        craft_draw.text((i*600+10,430),f'{source.width} x {source.height}',fill='black')
    craft_sheet.save(ROOT/'reports'/'drive-craft-contact-sheet.jpg',quality=90)
shrimp_full_source=Path('C:/Users/dj_ba/Downloads/20241028_165807 (1).jpg')
shrimp_source=shrimp_full_source if shrimp_full_source.exists() else Path('C:/Users/dj_ba/Downloads/20241028_165807.jpg')
if shrimp_source.exists():
    source=ImageOps.exif_transpose(Image.open(shrimp_source)).convert('RGB')
    print(f'Shrimp original native dimensions: {source.width}x{source.height}')
    outputs=[]
    for width in sorted(set(min(w,source.width) for w in (640,960,1440))):
        height=round(source.height*width/source.width)
        pic=source.resize((width,height),Image.Resampling.LANCZOS) if width!=source.width else source
        dest=ROOT/'public'/'images'/'food'/f'shrimp-taco-{width}.webp'
        dest.parent.mkdir(parents=True,exist_ok=True)
        pic.save(dest,'WEBP',quality=86,method=6)
        outputs.append({'path':'/'+dest.relative_to(ROOT/'public').as_posix(),'width':width,'height':height,'bytes':dest.stat().st_size})
        print(f"{outputs[-1]['path']}: {width}x{height}, {round(outputs[-1]['bytes']/1024)} KB")
    manifest.append({'sourceFilename':'20241028_165807.jpg','downloadedFilename':shrimp_source.name,'driveId':'19XOoeo4RAxmlJ-4vXQitrkOsXi01YjeJ','sourceUrl':'https://drive.google.com/file/d/19XOoeo4RAxmlJ-4vXQitrkOsXi01YjeJ/view','sourceFolderUrl':'https://drive.google.com/drive/folders/1_pkp3MIiKbU2pd8QLJlPKh8u_JzgdJtf','sourceFolderName':'Owner-provided Winter24 Google Drive folder','sourceWidth':source.width,'sourceHeight':source.height,'proposedMatchingDish':'Shrimp Taco','status':'inferred match from visible ingredients','classificationBasis':'Grilled shrimp, creamy slaw, sliced jalapeño, pink pickled onions and orange mayonnaise are visible on a black corn tortilla. The filename is a timestamp, not a dish label.','composition':'Portrait; taco occupies the central portion, with a dark upper background and wooden table below.','alt':'La Chingada grilled shrimp taco with slaw, jalapeño and pickled onions on a black tortilla','outputs':outputs})
if (ROOT/'work'/'drive-winter-originals.json').exists():
    winter=json.loads((ROOT/'work'/'drive-winter-originals.json').read_text(encoding='utf-8-sig'))
    winter_settings={
        '20241028_170654.jpg':('blackened-fish-taco','Blackened Fish Taco','A dark seared fish fillet, creamy slaw and pale green sauce are visible on a black corn tortilla, consistent with the current blackened fish taco. The seasoning and exact sauce are inferred, not identifiable from the timestamp filename.'),
        '20241028_170834.jpg':('baja-fish-taco','Baja Fish Taco','A battered fish fillet, pale and yellow fruit/slaw, pink pickled onions and orange mayonnaise are visible on a black corn tortilla, consistent with the current Baja fish taco. The filename is a timestamp, not a dish label.'),
        '20241028_171054.jpg':('aguachile','Aguachile','A bowl of shrimp, sliced avocado, red/pink onions and dark marinade is served with tostadas. This is a probable match to the current Aguachile based on the visible ingredients and serving format; the exact marinade and recipe are unconfirmed by the timestamp filename.'),
    }
    winter_entries=[]
    for p in winter:
        if p['name'] not in winter_settings:
            continue
        source=ImageOps.exif_transpose(Image.open(p['path'])).convert('RGB')
        slug,dish,basis=winter_settings[p['name']]
        outputs=[]
        for width in sorted(set(min(w,source.width) for w in (640,960))):
            height=round(source.height*width/source.width)
            resized=source.resize((width,height),Image.Resampling.LANCZOS)
            dest=ROOT/'public'/'images'/'food'/f'{slug}-{width}.webp'
            resized.save(dest,'WEBP',quality=86,method=6)
            outputs.append({'path':'/'+dest.relative_to(ROOT/'public').as_posix(),'width':width,'height':height,'bytes':dest.stat().st_size})
            print(f"{outputs[-1]['path']}: {width}x{height}, {round(outputs[-1]['bytes']/1024)} KB")
        entry={'sourceFilename':p['name'],'driveId':p.get('driveId'),'sourceUrl':p.get('folder'),'sourceWidth':source.width,'sourceHeight':source.height,'proposedMatchingDish':dish,'status':'probable match from visible ingredients' if slug=='aguachile' else 'inferred match from visible ingredients','classificationBasis':basis,'outputs':outputs}
        manifest.append(entry)
        winter_entries.append((p,source,entry))
    winter_sheet=Image.new('RGB',(1200,710),'#faf8f5')
    winter_draw=ImageDraw.Draw(winter_sheet)
    shrimp_source_image=ImageOps.exif_transpose(Image.open(shrimp_source)).convert('RGB') if shrimp_source.exists() else None
    sheet_sources=[('20241028_165807.jpg','Shrimp Taco — inferred',shrimp_source_image)] if shrimp_source_image else []
    sheet_sources += [(p['name'],e['proposedMatchingDish']+' — inferred',s) for p,s,e in winter_entries]
    for i,(name,label,source) in enumerate(sheet_sources):
        thumb=ImageOps.contain(source,(285,640))
        winter_sheet.paste(thumb,(i*300+8,0))
        winter_draw.text((i*300+8,650),name,fill='black')
        winter_draw.text((i*300+8,670),label,fill='black')
        winter_draw.text((i*300+8,690),f'{source.width} x {source.height}',fill='black')
    winter_sheet.save(ROOT/'reports'/'drive-winter-contact-sheet.jpg',quality=90)
if (ROOT/'work'/'drive-final-tacos.json').exists():
    final_tacos=json.loads((ROOT/'work'/'drive-final-tacos.json').read_text(encoding='utf-8-sig'))
    final_settings={
        'Carne.jpg':('carne-asada-taco','Carne Asada Taco','The owner-provided Carne label and visible seared steak with onion and cilantro support the Carne Asada Taco match.'),
        'KFC.png':('fried-chicken-taco','Fried Chicken Taco','The owner-provided KFC label and visible fried chicken, lettuce, pico and orange mayonnaise support the Fried Chicken Taco match.'),
        'Pastor.jpg':('pastor-taco','Pastor Taco','The owner-provided Pastor label and visible pork, pineapple and green salsa support the Pastor Taco match.'),
    }
    final_sheet=Image.new('RGB',(1200,470),'#faf8f5')
    final_draw=ImageDraw.Draw(final_sheet)
    for i,p in enumerate(final_tacos):
        source=ImageOps.exif_transpose(Image.open(p['path'])).convert('RGB')
        entry={'sourceFilename':p['name'],'driveId':p.get('driveId'),'sourceUrl':p['folder'],'sourceWidth':source.width,'sourceHeight':source.height,'proposedMatchingDish':None,'status':'unassigned older vegetarian recipe'}
        if p['name'] in final_settings:
            slug,dish,basis=final_settings[p['name']]
            width=min(640,source.width);height=round(source.height*width/source.width)
            pic=source.resize((width,height),Image.Resampling.LANCZOS)
            dest=ROOT/'public'/'images'/'menu'/f'{slug}-{width}.webp'
            pic.save(dest,'WEBP',quality=86,method=6)
            entry.update({'proposedMatchingDish':dish,'status':'matched by owner filename and visible ingredients','classificationBasis':basis,'assetPath':'/'+dest.relative_to(ROOT/'public').as_posix(),'width':width,'height':height,'bytes':dest.stat().st_size})
            print(f"{entry['assetPath']}: {width}x{height}, {round(entry['bytes']/1024)} KB")
        else:
            entry['classificationBasis']='Mushrooms, corn and green salsa are visible; this older vegetarian taco is not Halloumi Taco and is left unassigned.'
        manifest.append(entry)
        thumb=ImageOps.contain(source,(580,370))
        x=(i%2)*600+10;y=(i//2)*440
        if i==2:
            expanded=Image.new('RGB',(1200,910),'#faf8f5')
            expanded.paste(final_sheet,(0,0));final_sheet=expanded;final_draw=ImageDraw.Draw(final_sheet)
        final_sheet.paste(thumb,(x,y))
        final_draw.text((x,y+375),p['name'],fill='black')
        final_draw.text((x,y+395),entry['proposedMatchingDish'] or 'Unassigned older vegetarian recipe',fill='black')
        final_draw.text((x,y+415),f'{source.width} x {source.height}',fill='black')
    final_sheet.save(ROOT/'reports'/'drive-final-tacos-contact-sheet.jpg',quality=90)
(ROOT/'reports'/'menu-photo-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
