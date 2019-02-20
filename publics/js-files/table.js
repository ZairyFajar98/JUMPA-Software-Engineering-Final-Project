class Elt {
    constructor(type,subj){
        this.parent = document.createElement(type);
        this.child = document.createTextNode(subj);
    }
    addClass(name){
        this.parent.classList.add(name);
    }
    addChild(name){
        this.parent.appendChild(name);
    }
    addId(name){
        this.parent.id = name;
    }
    getElt(){
       this.parent.appendChild(this.child); 
        return this.parent;
    }
}

class ParentElt {
    constructor(type,subj){
        this.parent = document.createElement(type);
    }
    addClass(name){
        this.parent.classList.add(name);
    }
    addChild(name){
        this.parent.appendChild(name);
    }
    addId(name){
        this.parent.id = name;
    }
    getElt(){
        return this.parent;
    }
}


function negoTableAction(){
    let btn1 = new Elt('button','Agree');
    let btn2 = new Elt('button','Edit');
    let btn3 = new Elt('button','Info');
    btn1.addClass('mdl-button--colored');
    btn1.addClass('mdl-button');
    btn2.addClass('mdl-button--accent');
    btn2.addClass('mdl-button');
    btn3.addClass('mdl-button');
    let action = new ParentElt('div');
    action.addClass('action-neg');
    action.addChild(btn1.getElt());
    action.addChild(btn2.getElt());
    action.addChild(btn3.getElt());
    let cell = new ParentElt('td');
    cell.addChild(action.getElt());
    return cell;
}

function upcoTableAction(){
    let btn1 = new Elt('button','Finish');
    let btn2 = new Elt('button','Info'); 
    btn1.addClass('mdl-button--colored');
    btn1.addClass('mdl-button');
    btn2.addClass('mdl-button');
    let action = new ParentElt('div');
    action.addClass('action-upco');
    action.addChild(btn1.getElt());
    action.addChild(btn2.getElt());
    let cell = new ParentElt('td');
    cell.addChild(action.getElt());
    return cell;
}

function histTableAction(){
    let btn1 = new Elt('button','Delete');
    let btn2 = new Elt('button','Info'); 
    btn1.addClass('mdl-button--accent');
    btn1.addClass('mdl-button');
    btn2.addClass('mdl-button');
    let action = new ParentElt('div');
    action.addClass('action-upco');
    action.addChild(btn1.getElt());
    action.addChild(btn2.getElt());
    let cell = new ParentElt('td');
    cell.addChild(action.getElt());
    return cell;
}

