// Spline editor
'use strict';

var SE = SE || {};
SE.w = 1600;
SE.h = 1600;
SE.canvas = null;
SE.context = null;
SE.textarea = null;
SE.oldText = null;
SE.oldSel = null;

SE.point = function (aX, aY, aColor) {
    // render single point
    var size = 5,
        x = SE.canvas.width * aX / SE.w,
        y = SE.canvas.height - SE.canvas.height * aY / SE.h - 10;
    SE.context.fillStyle = aColor || 'red';
    SE.context.fillRect(x - size / 2, y - size / 2, size, size);
};

SE.render = function () {
    // render splines from textarea to canvas
    if (SE.oldText === SE.textarea.value && SE.oldSel === SE.textarea.selectionStart) {
        return false;
    }
    SE.oldText = SE.textarea.value;
    SE.oldSel = SE.textarea.selectionStart;
    SE.context.clearRect(0, 0, SE.canvas.width, SE.canvas.height);
    var i,
        in_spline_set = false,
        lines = SE.textarea.value.split('\n'),
        par,
        current_line = SE.textarea.value.substr(0, SE.textarea.selectionStart).split('\n').length;
    for (i = 0; i < lines.length; i++) {
        if (lines[i].match(/^EndSplineSet/)) {
            in_spline_set = false;
        }
        if (in_spline_set) {
            par = lines[i].trim().split(' ');
            if (lines[i].match(' m ')) {
                // move (x1 y1 m r,s,t)
                //console.info('m', par);
                SE.point(parseInt(par[0], 10), parseInt(par[1], 10), current_line === i ? 'red' : 'maroon');
            } else if (lines[i].match(' l ')) {
                // line (x1 y1 l r,s,t)
                //console.info('l', par);
                SE.point(parseInt(par[0], 10), parseInt(par[1], 10), current_line === i ? 'red' : 'lime');
            } else if (lines[i].match(' c ')) {
                // curve (x1 y1 x2 y2 x3 y3 c r,s,t)
                //console.info('c', par);
                SE.point(parseInt(par[2], 10), parseInt(par[3], 10), current_line === i ? 'red' : 'silver');
                SE.point(parseInt(par[0], 10), parseInt(par[1], 10), current_line === i ? 'red' : 'silver');
                SE.point(parseInt(par[4], 10), parseInt(par[5], 10), current_line === i ? 'red' : 'cyan');
            } else {
                // unknown
                console.warn(lines[i]);
            }
        }
        if (lines[i].match(/^SplineSet/)) {
            in_spline_set = true;
        }
    }
};

SE.onResize = function () {
    // refresh after window resize
    SE.canvas.width = window.innerWidth / 2;
    SE.canvas.height = window.innerHeight;
    SE.oldText = '';
    SE.render();
};

SE.onInit = function () {
    // initialize page
    SE.canvas = document.getElementById('canvas');
    SE.context = SE.canvas.getContext('2d');
    SE.textarea = document.getElementById('textarea');
    SE.textarea.addEventListener('change', SE.render);
    SE.textarea.addEventListener('keyup', SE.render);
    SE.onResize();
};

window.addEventListener('DOMContentLoaded', SE.onInit);
window.addEventListener('resize', SE.onResize);

