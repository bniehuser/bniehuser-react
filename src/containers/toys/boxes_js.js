
function makeEle(kind,opts) {
    var ele;
    if(kind === 'input' && opts['type'] === 'radio') {
        try {
            ele = document.createElement('<input type="radio" name="'+opts['name']+'" id="'+opts['id']+'"'+(opts['checked']?' checked':'')+' />');
        } catch(e) {
            ele = document.createElement(kind);
        }
    } else if(kind === 'iframe') {
        try {
            ele = document.createElement('<iframe name="'+opts['name']+'" id="'+opts['id']+'">');
        } catch(e) {
            ele = document.createElement(kind);
        }
    } else {
        ele = document.createElement(kind);
    }
    for(let k in opts) {
        if(opts.hasOwnProperty(k)) {
            switch (k) {
                // html / css
                case 'id':
                    ele.id = opts['id'];
                    break;
                case 'className':
                    ele.className = opts['className'];
                    break;
                case 'style':
                    ele.setAttribute('style', opts['style']);
                    break;
                case 'attr':
                    for (var att in opts['attr']) {
                        ele.setAttribute(att, opts['attr'][att]);
                    }
                    break;
                case 'cattr':
                    for (var att2 in opts['cattr']) {
                        ele[att2] = opts['cattr'][att2];
                    }
                    break;
                case 'height':
                    ele.style.height = opts['height'];
                    break;
                case 'width':
                    ele.style.width = opts['width'];
                    break;
                case 'top':
                    ele.style.top = opts['top'];
                    break;
                case 'bottom':
                    ele.style.bottom = opts['bottom'];
                    break;
                case 'left':
                    ele.style.left = opts['left'];
                    break;
                case 'right':
                    ele.style.right = opts['right'];
                    break;
                case 'border':
                    ele.style.border = opts['border'];
                    break;
                case 'borderLeft':
                    ele.style.borderLeft = opts['borderLeft'];
                    break;
                case 'borderRight':
                    ele.style.borderRight = opts['borderRight'];
                    break;
                case 'borderTop':
                    ele.style.borderTop = opts['borderTop'];
                    break;
                case 'borderBottom':
                    ele.style.borderBottom = opts['borderBottom'];
                    break;
                case 'borderLeftColor':
                    ele.style.borderLeftColor = opts['borderLeftColor'];
                    break;
                case 'borderRightColor':
                    ele.style.borderRightColor = opts['borderRightColor'];
                    break;
                case 'borderTopColor':
                    ele.style.borderTopColor = opts['borderTopColor'];
                    break;
                case 'borderBottomColor':
                    ele.style.borderBottomColor = opts['borderBottomColor'];
                    break;
                case 'borderRadius':
                    ele.style.borderRadius = opts['borderRadius'];
                    break;
                case 'background':
                    ele.style.background = opts['background'];
                    break;
                case 'padding':
                    ele.style.padding = opts['padding'];
                    break;
                case 'margin':
                    ele.style.margin = opts['margin'];
                    break;
                case 'color':
                    ele.style.color = opts['color'];
                    break;
                case 'display':
                    ele.style.display = opts['display'];
                    break;
                case 'float':
                    ele.style.styleFloat = opts['float'];
                    ele.style.cssFloat = opts['float'];
                    break;
                case 'clear':
                    ele.style.clear = opts['clear'];
                    break;
                case 'fontSize':
                    ele.style.fontSize = opts['fontSize'];
                    break;
                case 'fontWeight':
                    ele.style.fontWeight = opts['fontWeight'];
                    break;
                case 'fontFamily':
                    ele.style.fontFamily = opts['fontFamily'];
                    break;
                case 'textAlign':
                    ele.style.textAlign = opts['textAlign'];
                    break;
                case 'position':
                    ele.style.position = opts['position'];
                    break;
                case 'zIndex':
                    ele.style.zIndex = opts['zIndex'];
                    break;
                case 'overflow':
                    ele.style.overflow = opts['overflow'];
                    break;
                // content
                case 'dom':
                    if (opts['dom']) {
                        if (opts['dom'][0]) {
                            for (var q = 0; q < opts['dom'].length; q++) {
                                try {
                                    ele.appendChild(opts['dom'][q]);
                                } catch (e) {
                                    // do nothing.
                                }
                            }
                        } else {
                            // pre-build?
                            ele.appendChild(opts['dom']);
                        }
                    }
                    break;
                case 'text':
                    ele.appendChild(document.createTextNode(opts['text']));
                    break;
                case 'html':
                    ele.innerHTML += opts['html'];
                    break;
                // links
                case 'href':
                    ele.href = opts['href'];
                    break;
                // forms / inputs
                case 'type':
                    ele.setAttribute('type', opts['type']);
                    break;
                case 'name':
                    ele.setAttribute('name', opts['name']);
                    break;
                case 'value':
                    ele.setAttribute('value', opts['value']);
                    break;
                case 'opts':
                    for (var i = 0; i < opts['opts'].length; i++) {
                        if (!ele.options) ele.options.length = 0;
                        ele.options[ele.options.length] = new Option(opts['opts'][i].text, opts['opts'][i].value);
                        if (opts['opts'][i].selected) ele.options[ele.options.length - 1].selected = true;
                    }
                    break;
                case 'method':
                    ele.setAttribute('method', opts['method']);
                    break;
                case 'action':
                    ele.setAttribute('action', opts['action']);
                    break;
                case 'onsubmit':
                    ele.onsubmit = opts['onsubmit'];
                    break;
                case 'checked':
                    ele.checked = opts['checked'];
                    break;
                case 'selected':
                    ele.selected = opts['selected'];
                    break;
                case 'target':
                    ele.setAttribute('target', opts['target']);
                    break;
                // img / script
                case 'src':
                    ele.setAttribute('src', opts['src']);
                    break;
                // label
                case 'labelfor':
                    ele.setAttribute('for', opts['labelfor']);
                    break;
                // filters / opacity
                case 'opacity':
                    ele.style.opacity = opts['opacity'];
                    ele.style.filter = 'filter:alpha(opacity=' + (parseFloat(opts['opacity']) * 100) + ')';
                    break;
                // table
                case 'cellPadding':
                    ele.cellPadding = opts['cellPadding'];
                    break;
                case 'cellSpacing':
                    ele.cellPadding = opts['cellSpacing'];
                    break;
                case 'rowspan':
                    ele.rowSpan = opts['rowspan'];
                    break;
                case 'colspan':
                    ele.colSpan = opts['colspan'];
                    break;
                case 'align':
                    ele.setAttribute('align', opts['colspan']);
                    break;
                case 'valign':
                    ele.vAlign = opts['valign'];
                    break;
                // events
                case 'onload':
                    ele.onload = opts['onload'];
                    break;
                case 'onclick':
                    ele.onclick = opts['onclick'];
                    break;
                case 'onchange':
                    ele.onchange = opts['onchange'];
                    break;
                case 'onmousedown':
                    ele.onmousedown = opts['onmousedown'];
                    break;
                case 'onmouseover':
                    ele.onmouseover = opts['onmouseover'];
                    break;
                case 'onmouseout':
                    ele.onmouseout = opts['onmouseout'];
                    break;
                case 'onmouseup':
                    ele.onmouseup = opts['onmouseup'];
                    break;
                case 'onkeydown':
                    ele.onkeydown = opts['onkeydown'];
                    break;
                case 'onkeyup':
                    ele.onkeyup = opts['onkeyup'];
                    break;
                case 'onfocus':
                    ele.onfocus = opts['onfocus'];
                    break;
                case 'onunfocus':
                    ele.onunfocus = opts['onunfocus'];
                    break;
                case 'onblur':
                    ele.onblur = opts['onblur'];
                    break;
                default:
                // do nothing
            }
        }
    }
    return ele;
}

// non-'$' elementById shortcuts
function eID(id) {
    return document.getElementById(id);
}

function getXMLHTTP(){
    var A=null;
    try{
        A=new XMLHttpRequest()
    } catch(e){
        alert('wow, this is a really broken browser...');
        // try{
        //     A=new ActiveXObject("Msxml2.XMLHTTP")
        // } catch(ee){
        //     try {
        //         A=new ActiveXObject("Microsoft.XMLHTTP")
        //     } catch(eee) {
        //         A=null;
        //     }
        // }
    }
    return A
}
function importSVG(url) {
    var trans = getXMLHTTP();
    trans.overrideMimeType('text/xml');
    if(trans) {
        trans.open("GET",url,false);
        trans.send(null);
        return trans.responseXML.documentElement;
    }
    return false;
}

var BOXES = {
    // events
    eventRegister:{
        mousemove:[],
        mousedown:[],
        mouseup:[],
        keydown:[],
        keyup:[]
    },
    register: function(t,f) {
        this.eventRegister[t].push(f);
    },
    deregister: function(t,f) {
        var el = this.eventRegister[t];
        for(var i=0;i<el.length;i++) {
            if(el[i]===f) {
                el.splice(i,1);
                i--;
            }
        }
    },
    clear: function() {
        Object.keys(this.listeners).forEach(l => {
            console.log('removing doc listener', l);
            document.removeEventListener(l, this.listeners[l])
        });
        this.listeners = {};
        Object.keys(this.listenersWindow).forEach(l => {
            console.log('removing window listener', l);
            window.removeEventListener(l, this.listenersWindow[l])
        });
        this.listenersWindow = {};
    },
    fireEvent: function(t,e) {
        e = e||window.event;
        var r = this.eventRegister[t];
        for(var f in r) {
            r[f](e);
        }
    },
    onmousemove: function(e) {
        BOXES.fireEvent('mousemove',e);
    },
    onmousedown: function(e) {
        e = e||window.event;
        eID('mousedown').innerHTML = e.which;
        BOXES.fireEvent('mousedown',e);
        return false;
    },
    onmouseup: function(e) {
        e = e||window.event;
        eID('mousedown').innerHTML = '-';
        BOXES.fireEvent('mouseup',e);
        return false;
    },
    onkeydown: function(e) {
        e = e||window.event;
        eID('keysdown').innerHTML = e.keyCode;
        BOXES.fireEvent('keydown',e);
    },
    onkeyup: function(e) {
        e = e||window.event;
        eID('keysdown').innerHTML = '-';
        BOXES.fireEvent('keyup',e);
    },
    onresize: function(e) {
        BOXES.getScreenInfo();
        BOXES.drawGrid();
    },
    // dom contents
    domConsole: function() {
        return makeEle('div',{id:'console',dom:[
                makeEle('div',{id:'notes',text:'notes'}),
                makeEle('div',{id:'mousepos',text:'mouse pos'}),
                makeEle('div',{id:'mousedown',text:'mouse down'}),
                makeEle('div',{id:'keysdown',text:'keys down'}),
                makeEle('div',{id:'log',text:'log'})
            ]});
    },
    domControls: function() {
        return makeEle('div',{id:'controls',dom:[
                makeEle('a',{id:'controlUnit',href:'#',text:'Units'}),
                makeEle('a',{id:'controlTerrain',href:'#',text:'Terrain'}),
                makeEle('a',{id:'controlMove',href:'#',text:'Move'}),
                makeEle('a',{id:'controlLine',href:'#',text:'Line',onmouseup:function() { BOXES.changeModes('line'); return false; }}),
                makeEle('a',{id:'controlPoint',href:'#',text:'Point',onmouseup:function() { BOXES.changeModes('point'); return false; }}),
                makeEle('a',{id:'controlOptions',href:'#',text:'Options'})
            ]});
    },
    domGrid: function() {
        return makeEle('div',{id:'grid'});
    },
    // dom manipulation
    drawGrid: function() {
        var s = this.screen;
        var g = eID('grid');
        while(g.childNodes.length) {
            g.removeChild(g.childNodes[0]);
        }
        var u = s.scale*10;
        var xs = Math.ceil(s.offsetX/u)*u;
        for(var i=xs;i<=(s.offsetX+s.width);i+=u) {
            if(!(Math.round(i*100)%Math.round(u*1000))) {
                g.appendChild(makeEle('div',{className:'gridVert',left:i+'px',dom:makeEle('div',{text:Math.round(i/s.scale)})}));
            } else {
                g.appendChild(makeEle('div',{className:'gridSubVert',left:i+'px'}));
            }
        }
        var ys = Math.ceil(s.offsetY/u)*u;
        for(var i2=ys;i2<=(s.offsetY+s.height);i2+=u) {
            if(!(Math.round(i2*100)%Math.round(u*1000))) {
                g.appendChild(makeEle('div',{className:'gridHoriz',top:i2+'px',dom:makeEle('div',{text:Math.round(i2/s.scale)})}));
            } else {
                g.appendChild(makeEle('div',{className:'gridSubHoriz',top:i2+'px'}));
            }
        }
    },
    // data members
    screen: {
        offsetX:0,
        offsetY:0,
        width:0,
        height:0,
        scale:3.5
    },
    // internal tools
    getScreenInfo: function() {
        this.screen.width = parseInt(window.innerWidth,10);
        this.screen.height = parseInt(window.innerHeight,10);
    },
    // modes
    currentMode: 0,
    modes: {
        line: function() {
            var M = this;
            this.mouseIsDown = false;
            this.evt = {
                mousemove: function(e) {
                    if(M.mouseIsDown) eID('notes').innerHTML = 'LINE MOUSE MOVING - '+e.x+'/'+e.y;
                },
                mousedown: function(e) {
                    M.mouseIsDown = true;
                    eID('notes').innerHTML = 'LINE MOUSE MOVING';
                },
                mouseup: function(e) {
                    M.mouseIsDown = false;
                    eID('notes').innerHTML = '';
                }
            }
            return this;
        },
        point: function() {
            var P = this;
            this.mouseIsDown = false;
            this.evt = {
                mousemove: function(e) {
                    if(P.mouseIsDown) eID('notes').innerHTML = 'POINT MOUSE MOVING - '+e.x+'/'+e.y;
                },
                mousedown: function(e) {
                    P.mouseIsDown = true;
                    eID('notes').innerHTML = 'POINT MOUSE MOVING';
                },
                mouseup: function(e) {
                    P.mouseIsDown = false;
                    eID('notes').innerHTML = '';
                }
            }
            return this;
        },
        smooth: {
        }
    },
    changeModes: function(mode) {
        if(this.currentMode) {
            var m = this.currentMode;
            if(typeof m.evt != 'undefined') {
                for(var i in m.evt) {
                    this.deregister(i,m.evt[i]);
                }
            }
            if(typeof m.destroy != 'undefined') {
                m.destroy();
            }
        }
        if(this.modes[mode]) {
            var m2 = this.modes[mode]();
            if(typeof m2.init != 'undefined') {
                m2.init();
            }
            if(typeof m2.evt != 'undefined') {
                for(var i2 in m2.evt) {
                    this.register(i2,m2.evt[i2]);
                }
            }
            this.currentMode = m2;
        }
    },
    listeners: {},
    listenersWindow: {},
    // init
    init: function(useId) {

        // determine screen size and initial grid offsets
        this.getScreenInfo();

        // set up master events
        document.addEventListener('mousemove',this.onmousemove,false);
        document.addEventListener('mousedown',this.onmousedown,false);
        document.addEventListener('mouseup',this.onmouseup,false);
        document.addEventListener('keydown',this.onkeydown,false);
        document.addEventListener('keyup',this.onkeyup,false);
        window.addEventListener('resize',this.onresize,false);

        // housekeeping so we can kill these later
        this.listeners['mousemove'] = this.onmousemove;
        this.listeners['mousedown'] = this.onmousedown;
        this.listeners['mouseup'] = this.onmouseup;
        this.listeners['keydown'] = this.onkeydown;
        this.listeners['keyup'] = this.onkeyup;
        this.listenersWindow['resize'] = this.onresize;

        // add html elements
        var btag = document.getElementsByTagName('body')[0];
        if(useId) {
            btag = document.getElementById(useId);
        }

        var mastertile = importSVG('/tile.svg');
        mastertile.style.width=(this.screen.scale*10)+'px';
        mastertile.style.height=(this.screen.scale*10)+'px';
        mastertile.style.position='absolute';
        for(var i=5;i<15;i++) {
            for(var j=5;j<15;j++) {
                var tile = mastertile.cloneNode(true);
                tile.id = 'tile_'+i+'_'+j;
                tile.style.top=(this.screen.scale*10*j)+'px';
                tile.style.left=(this.screen.scale*10*i)+'px';
                btag.appendChild(tile);
            }
        }

        btag.appendChild(this.domGrid());
        btag.appendChild(this.domConsole());
        btag.appendChild(this.domControls());

        // modify screen contents
        this.drawGrid();

        // testing stuff
        var showpos = function(e) {
            eID('mousepos').innerHTML = e.x+' / '+e.y;
        };
        var stopshow = function(e) {
            BOXES.deregister('mousemove',showpos);
            eID('mousepos').innerHTML = 'paused';
        };
        var startshow = function(e) {
            BOXES.register('mousemove',showpos);
        };
        this.register('mousemove',showpos);
        this.register('mousedown',stopshow);
        this.register('mouseup',startshow);


        this.changeModes('line');

    }
};

export default BOXES;
