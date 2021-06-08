// from my old sugar.js lib
/* SUGAR (should be in another lib) */

// dhtml swizziness
function clearEle(ele) {
    while(ele.childNodes.length) {
        ele.removeChild(ele.childNodes[0]);
    }
}

function makeEle(kind,opts) {
    var ele = null;
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
        switch(k) {
            // html / css
            case 'id': ele.id = opts['id']; break;
            case 'className': ele.className = opts['className']; break;
            case 'style': ele.setAttribute('style',opts['style']); break;
            case 'attr':
                for(var att in opts['attr']) {
                    ele.setAttribute(att,opts['attr'][att]);
                }
                break;
            case 'cattr':
                for(var att2 in opts['cattr']) {
                    ele[att2] = opts['cattr'][att2];
                }
                break;
            case 'height': ele.style.height = opts['height']; break;
            case 'width': ele.style.width = opts['width']; break;
            case 'top': ele.style.top = opts['top']; break;
            case 'bottom': ele.style.bottom = opts['bottom']; break;
            case 'left': ele.style.left = opts['left']; break;
            case 'right': ele.style.right = opts['right']; break;
            case 'border': ele.style.border = opts['border']; break;
            case 'borderLeft': ele.style.borderLeft = opts['borderLeft']; break;
            case 'borderRight': ele.style.borderRight = opts['borderRight']; break;
            case 'borderTop': ele.style.borderTop = opts['borderTop']; break;
            case 'borderBottom': ele.style.borderBottom = opts['borderBottom']; break;
            case 'borderLeftColor': ele.style.borderLeftColor = opts['borderLeftColor']; break;
            case 'borderRightColor': ele.style.borderRightColor = opts['borderRightColor']; break;
            case 'borderTopColor': ele.style.borderTopColor = opts['borderTopColor']; break;
            case 'borderBottomColor': ele.style.borderBottomColor = opts['borderBottomColor']; break;
            case 'borderRadius': ele.style.borderRadius = opts['borderRadius']; break;
            case 'background': ele.style.background = opts['background']; break;
            case 'padding': ele.style.padding = opts['padding']; break;
            case 'margin': ele.style.margin = opts['margin']; break;
            case 'color': ele.style.color = opts['color']; break;
            case 'display': ele.style.display = opts['display']; break;
            case 'float': ele.style.styleFloat = opts['float']; ele.style.cssFloat = opts['float']; break;
            case 'clear': ele.style.clear = opts['clear']; break;
            case 'fontSize': ele.style.fontSize = opts['fontSize']; break;
            case 'fontWeight': ele.style.fontWeight = opts['fontWeight']; break;
            case 'fontFamily': ele.style.fontFamily = opts['fontFamily']; break;
            case 'textAlign': ele.style.textAlign = opts['textAlign']; break;
            case 'position': ele.style.position = opts['position']; break;
            case 'zIndex': ele.style.zIndex = opts['zIndex']; break;
            case 'overflow': ele.style.overflow = opts['overflow']; break;
            // content
            case 'dom':
                if(opts['dom']) {
                    if(opts['dom'][0]) {
                        for(var q=0;q<opts['dom'].length;q++) {
                            try {
                                ele.appendChild(opts['dom'][q]);
                            } catch(e) {
                                // do nothing.
                            }
                        }
                    } else {
                        // pre-build?
                        ele.appendChild(opts['dom']);
                    }
                }
                break;
            case 'text': ele.appendChild(document.createTextNode(opts['text'])); break;
            case 'html': ele.innerHTML += opts['html']; break;
            // links
            case 'href': ele.href = opts['href']; break;
            // forms / inputs
            case 'type': ele.setAttribute('type',opts['type']); break;
            case 'name': ele.setAttribute('name',opts['name']); break;
            case 'value': ele.setAttribute('value',opts['value']); break;
            case 'opts':
                for(var i=0;i<opts['opts'].length;i++) {
                    if(!ele.options) ele.options.length = 0;
                    ele.options[ele.options.length] = new Option(opts['opts'][i].text,opts['opts'][i].value);
                    if(opts['opts'][i].selected) ele.options[ele.options.length-1].selected = true;
                }
                break;
            case 'method': ele.setAttribute('method',opts['method']); break;
            case 'action': ele.setAttribute('action',opts['action']); break;
            case 'onsubmit': ele.onsubmit = opts['onsubmit']; break;
            case 'checked': ele.checked = opts['checked']; break;
            case 'selected': ele.selected = opts['selected']; break;
            case 'target': ele.setAttribute('target',opts['target']); break;
            // img / script
            case 'src': ele.setAttribute('src',opts['src']); break;
            // label
            case 'labelfor': ele.setAttribute('for',opts['labelfor']); break;
            // filters / opacity
            case 'opacity': ele.style.opacity = opts['opacity']; ele.style.filter = 'filter:alpha(opacity='+(parseFloat(opts['opacity'])*100)+')'; break;
            // table
            case 'cellPadding': ele.cellPadding = opts['cellPadding']; break;
            case 'cellSpacing': ele.cellPadding = opts['cellSpacing']; break;
            case 'rowspan': ele.rowSpan = opts['rowspan']; break;
            case 'colspan': ele.colSpan = opts['colspan']; break;
            case 'align': ele.setAttribute('align',opts['colspan']); break;
            case 'valign': ele.vAlign = opts['valign']; break;
            // events
            case 'onload': ele.onload = opts['onload']; break;
            case 'onclick': ele.onclick = opts['onclick']; break;
            case 'onchange': ele.onchange = opts['onchange']; break;
            case 'onmousedown': ele.onmousedown = opts['onmousedown']; break;
            case 'onmouseover': ele.onmouseover = opts['onmouseover']; break;
            case 'onmouseout': ele.onmouseout = opts['onmouseout']; break;
            case 'onmouseup': ele.onmouseup = opts['onmouseup']; break;
            case 'onkeydown': ele.onkeydown = opts['onkeydown']; break;
            case 'onkeyup': ele.onkeyup = opts['onkeyup']; break;
            case 'onfocus': ele.onfocus = opts['onfocus']; break;
            case 'onunfocus': ele.onunfocus = opts['onunfocus']; break;
            case 'onblur': ele.onblur = opts['onblur']; break;
            default:
                // do nothing
        }
    }
    return ele;
}

// non-'$' elementById shortcuts
function eID(id) {
    return document.getElementById(id);
}

// for dhtml swizzies


// my old bombsquad script
var BSQUAD = {
    sizeX:20,
    sizeY:20,
    numBombs:40,
    squareSize:20,
    squareScale:100,
    grid: [],
    allsquares: [],
    timer: null,
    runningtime: 0,
    isF: false,
    ended: false,
    deathMsg: [
        "Big Fail!  Set off a bomb!",
        "You Suck!  'Sploded!",
        "Ssssssssssss... BOOM!",
        "KAPLOOOOOWIE!!!",
        "KAPLOWWWIEEE!",
        "Relentless Logic is the key!",
        "Your relatives will bury you in very small pieces.",
        "Note to self: close proximity to exploding bomb = painful",
        "Congratulations!  You DIED!",
        "The red wire... no... THE BLUE WIRE!!!",
        "The red wire... THE RED WIRE!!!",
        "RTFM first next time...",
        "Now we know why they call you 'Lefty'...",
        "Try to remember, the little numbers are to tell you how many bombs there are."
    ],
    Square: function(x,y) {
        this.x = x;
        this.y = y;
        this.hasBomb = false;
        this.clicked = false;
        this.flagged = false;
        this.mcount = 0;
        this.checksq=[];
    },
    init: function(appendId) {
        this.ended = false;
        if(eID('bs_gameScreen')) {
            var gs = eID('bs_gameScreen');
            if(gs.parentElement) gs.parentElement.removeChild(gs);
            else document.body.removeChild(gs);
        }
        this.grid = [];
        this.allsquares = [];
        if(this.resetflash) this.resetflash = clearInterval(this.resetflash);
        if(this.timer) this.timer = clearInterval(this.timer);
        this.bs_gameScreen = makeEle('div',{id:'bs_gameScreen'});
        this.controls = makeEle('div',{id:'bs_gameControls',dom:[
                makeEle('h1',{id:'bs_mainTitle',text:'BombSquad'}),
                makeEle('div',{dom:[
                        makeEle('div',{className:'bs_headInfo',dom:[
                                makeEle('div',{className:'bs_dispHead',text:'Bombs:'}),
                                makeEle('input',{className:'bs_dispInp',id:'bs_notFlagged',value:BSQUAD.numBombs})
                            ]}),
                        makeEle('div',{className:'bs_headInfo',dom:[
                                makeEle('button',{id:'bs_resetButt',className:'bs_butt',text:'RESET',onclick:function() { BSQUAD.init(appendId);return false; }}),
                                makeEle('div',{id:'bs_note'})
                            ]}),
                        makeEle('div',{className:'bs_headInfo',dom:[
                                makeEle('div',{className:'bs_dispHead',text:'Timer:'}),
                                makeEle('input',{className:'bs_dispInp',id:'bs_timerDisp',value:'0:00'})
                            ]}),
                        makeEle('br',{clear:'both'})
                    ]}),
                makeEle('div',{padding:'3px 10px',fontSize:'75%',dom:[
                        makeEle('span',{text:'Right Click or \'f\'+click to Flag Bombs... ('}),
                        makeEle('a',{ href:'#',text:'Settings',
                            onclick:function(e) {
                                var d = eID('bs_settings').style.display;
                                eID('bs_settings').style.display = d==='none'?'':'none';
                                return false;
                            }
                        }),
                        makeEle('span',{text:')'}),
                        makeEle('div',{id:'bs_settings',display:'none',dom:[
                                makeEle('span',{text:' Rows:'}),
                                makeEle('input',{type:'text',className:'bs_smInp',width:'30px',value:this.sizeX,id:'bs_sizeX'}),
                                makeEle('span',{text:' Cols:'}),
                                makeEle('input',{type:'text',className:'bs_smInp',width:'30px',value:this.sizeY,id:'bs_sizeY'}),
                                makeEle('span',{text:' Mines:'}),
                                makeEle('input',{type:'text',className:'bs_smInp',width:'30px',value:this.numBombs,id:'bs_numBombs'}),
                                makeEle('span',{text:' Size:'}),
                                makeEle('input',{type:'text',className:'bs_smInp',width:'30px',value:this.squareScale,id:'bs_squareScale'}),
                                makeEle('span',{text:'% '}),
                                makeEle('button',{className:'bs_butt',text:'new game',onclick:function() {
                                        BSQUAD.sizeX = parseInt(eID('bs_sizeX').value) || 1;
                                        BSQUAD.sizeY = parseInt(eID('bs_sizeY').value) || 1;
                                        BSQUAD.numBombs = parseInt(eID('bs_numBombs').value) || 1;
                                        BSQUAD.squareScale = parseInt(eID('bs_squareScale').value) || 15;
                                        BSQUAD.init(appendId);
                                        return false;
                                    }})
                            ]})
                    ]})
            ]});
        this.bs_gameScreen.appendChild(this.controls);
        this.board = makeEle('div',{id:'bs_theBoard'});
        this.bs_gameScreen.appendChild(this.board);
        // ORIGINAL CODE simply appended game to body tag
        // document.getElementsByTagName('body')[0].appendChild(this.bs_gameScreen);
        // UPDATE looks for id passed to init
        if(appendId) {
            document.getElementById(appendId).appendChild(this.bs_gameScreen);
        } else {
            document.getElementsByTagName('body')[0].appendChild(this.bs_gameScreen);
        }
        for(var i=0;i<this.sizeX;i++) {
            if(!this.grid[i]) this.grid[i] = [];
            for(var j=0;j<this.sizeY;j++) {
                var sq = new this.Square(i,j);
                this.grid[i][j] = sq;
                this.allsquares.push(sq);
            }
        }
        var mcount = 0;
        while(mcount<this.numBombs) {
            var tsq = this.getRandSquare();
            if(!tsq.hasBomb) {
                tsq.hasBomb = true;
                mcount++;
            }
        }
        for(var idx=0;idx<this.allsquares.length;idx++) this.allsquares[idx].init();
        this.clickedTiles = 0;
        this.totTiles = this.sizeX*this.sizeY;
        document.onkeydown = function(e) {
            e = e||window.event;
            if(e.keyCode === 70) BSQUAD.isF = true;
        }
        document.onkeyup = function(e) {
            e = e||window.event;
            if(e.keyCode === 70) BSQUAD.isF = false;
        }
    },
    startTimer: function() {
        this.startTime = (new Date()).getTime();
        this.timer = setInterval(function() { BSQUAD.doTimer(); },1000);
    },
    doTimer: function() {
        var tdiff = (new Date()).getTime() - this.startTime;
        var sdiff = Math.round(tdiff/1000);
        var secs = (sdiff%60);
        if(secs<10) secs = '0'+secs;
        var tdisp = Math.floor(sdiff/60)+':'+secs;
        eID('bs_timerDisp').value = tdisp;
    },
    getRandSquare: function() {
        return this.allsquares[Math.floor(Math.random()*this.allsquares.length)];
    },
    win: function() {
        clearInterval(this.timer);
        this.doTimer();
        this.ended = true;
        alert("You won!  Congratulations on your time of "+eID('bs_timerDisp').value+"!");
    },
    end: function() {
        clearInterval(this.timer);
        this.ended = true;
        for(var i=0;i<this.allsquares.length;i++) {
            var ts = this.allsquares[i];
            if(ts.hasBomb) ts.ele.className = ts.ele.className.replace(' bs_unclicked',' bs_bomb');
        }
        this.resetflash = setInterval(function() {
            var rb = eID('bs_resetButt');
            if(rb.className.indexOf('bs_flasher')>-1) rb.className = rb.className.replace(' bs_flasher','');
            else rb.className += ' bs_flasher';
        },375);
        alert(BSQUAD.deathMsg[Math.floor(Math.random()*BSQUAD.deathMsg.length)]);
    },
    destroy: function() {
        // just clear the timer
        if(this.resetflash) this.resetflash = clearInterval(this.resetflash);
        if(this.timer) this.timer = clearInterval(this.timer);
    }
}
BSQUAD.Square.prototype.init = function() {
    var sqs = Math.round(BSQUAD.squareSize*(BSQUAD.squareScale/100));
    this.ele = makeEle('div',{
        className:'bs_square bs_unclicked',
        left:(this.x*sqs)+'px',
        top:(this.y*sqs)+'px',
        height:(sqs-1)+'px',
        width:(sqs-1)+'px',
        fontSize:Math.round(sqs*.75)+'px',
        cattr:{sq:this},
        onmousedown:function(e) { return false; },
        onmouseup:function(e) {
            var rc;
            e = e||window.event;
            if (e.which) rc = (e.which === 3);
            else if (e.button) rc = (e.button === 2);
            if(!BSQUAD.ended) {
                if(BSQUAD.isF || rc) this.sq.flagSquare();
                else this.sq.clickSquare();
                return false;
            }
        }
    });
    this.ele.oncontextmenu = function() { return false; }
    eID('bs_theBoard').appendChild(this.ele);
    var startx = this.x-1>0?this.x-1:0;
    var starty = this.y-1>0?this.y-1:0;
    var endx = this.x+1<BSQUAD.sizeX?this.x+1:BSQUAD.sizeX-1;
    var endy = this.y+1<BSQUAD.sizeY?this.y+1:BSQUAD.sizeY-1;
    for(var i=startx;i<=endx;i++) {
        for(var j=starty;j<=endy;j++) {
            var tsq = BSQUAD.grid[i][j];
            if(tsq !== this) {
                if(tsq.hasBomb) this.mcount++;
                this.checksq.push(tsq);
            }
        }
    }
}
BSQUAD.Square.prototype.clickSquare = function() {
    if(!this.clicked && !this.flagged) {
        this.clicked = true;
        BSQUAD.clickedTiles++;
        if(!BSQUAD.timer) BSQUAD.startTimer();
        var winning = (BSQUAD.totTiles-BSQUAD.clickedTiles===BSQUAD.numBombs)?true:false;
        if(this.hasBomb) {
            this.ele.className = this.ele.className.replace(' bs_unclicked',' bs_bomb');
            BSQUAD.end();
        } else if(this.mcount) {
            this.ele.className = this.ele.className.replace(' bs_unclicked',' bs_clicked');
            clearEle(this.ele);
            this.ele.appendChild(makeEle('span',{className:'bs_m'+this.mcount,text:this.mcount}));
        } else {
            this.ele.className = this.ele.className.replace(' bs_unclicked',' bs_clicked');
            if(!winning) {
                for(var i=0;i<this.checksq.length;i++) this.checksq[i].clickSquare();
            }
        }
        if(winning) BSQUAD.win();
    }
}
BSQUAD.Square.prototype.flagSquare = function() {
    if(!this.clicked) {
        this.flagged = this.flagged===2?0:this.flagged+1;
        var mc = undefined;
        if(this.flagged === 1) {
            clearEle(this.ele);
            this.ele.appendChild(makeEle('span',{className:"bs_infoText",text:'F'}));
            this.ele.className = this.ele.className.replace(' bs_unclicked',' bs_flagged');
            mc = eID('bs_notFlagged');
            mc.value = parseInt(mc.value,10)-1;
        } else if(this.flagged === 2) {
            clearEle(this.ele);
            this.ele.appendChild(makeEle('span',{className:"bs_infoText",text:'?'}));
            this.ele.className = this.ele.className.replace(' bs_flagged',' bs_question');
            mc = eID('bs_notFlagged');
            mc.value = parseInt(mc.value,10)+1;
        } else {
            this.ele.innerHTML = '';
            this.ele.className = this.ele.className.replace(' bs_question',' bs_unclicked');
        }
    }
}

// window.onload = function() { BSQUAD.init(); }
export default BSQUAD;
