class Shape {

    constructor(options) {
        this.id = null;
        this.type = null; // type of the shape

        this.startX = options.startX;
        this.startY = options.startY;
        this.w = options.w;
        this.h = options.h;

        this.fillColor = options.fillColor;
        this.outline = options.outline;
        this.outlineWidth = options.outlineWidth;
        // variables of selection border
        this.selectionColor = '#bdbbbb';
        this.selectionWidth = 1;

        this.closeEnough = 7; // used for resizing to know if the cursor is close to corners 
        this.handleRadius = 3; // radius of handles of resizing 
        this.connectorRadius = 5

        // rotation attributes
        this.angle = 0;
        this.toAngle = 0;
    }

    getCoordinates() {
        let x = this.startX,
            y = this.startY;
        if (this.angle != this.toAngle) {
            if (this.type == 'ellipse') {
                x = 0
                y = 0
            } else {
                x = -this.w / 2
                y = -this.h / 2
            }
        }
        let endX = x + this.w,
            endY = y + this.h,
            centerX = x + this.w / 2,
            centerY = y + this.h / 2,
            x1 = endX,
            y1 = endY,
            x2 = (x + endX) / 2,
            y2 = endY,
            x3 = x,
            y3 = endY,
            x4 = endX,
            y4 = (y + endY) / 2,
            x5 = x,
            y5 = y4,
            x6 = endX,
            y6 = y,
            x7 = x2,
            y7 = y,
            x8 = x,
            y8 = y,
            cx1 = endX,
            cy1 = endY,
            cx2 = x,
            cy2 = endY,
            cx3 = cx2 - (cx1 - cx2),
            cy3 = endY,
            cx4 = cx3,
            cy4 = y,
            cx5 = cx3,
            cy5 = y - (endY - y),
            cx6 = cx5 + (cx2 - cx3),
            cy6 = cy5,
            cx7 = cx6 + (cx6 - cx5),
            cy7 = cy6,
            cx8 = cx7,
            cy8 = y;

        return {
            startX: x, startY: y, endX: endX, endY: endY, centerX: centerX, centerY: centerY, x1: x1, y1: y1, x2: x2, y2: y2, x3: x3, y3: y3, x4: x4, y4: y4, x5: x5, y5: y5, x6: x6, y6: y6, x7: x7, y7: y7,
            x8: x8, y8: y8, cx1: cx1, cy1: cy1, cx2: cx2, cy2: cy2, cx3: cx3, cy3: cy3, cx4: cx4, cy4: cy4, cx5: cx5, cy5: cy5, cx6: cx6, cy6: cy6, cx7: cx7, cy7: cy7,
            cx8: cx8, cy8: cy8
        }
    }// if we are rotating we have to use use the values after rotation

    drawHandle(x, y, radius, outline, fill, outlineWidth) { // function for drawing circles on corners (handles of resizing)
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = outlineWidth;
        ctx.beginPath();
        ctx.strokeStyle = outline;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = fill;
        ctx.fill();

    }

    select(ctx) { // add some design when shape is selected
        //style
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        //draw
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.setLineDash([5, 5]); // dashed line
        ctx.rect(this.getCoordinates().startX, this.getCoordinates().startY, this.w, this.h)
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]) // solid line 
        ctx.beginPath()//rotation handle
        ctx.moveTo(this.getCoordinates().x7, this.getCoordinates().y7)
        ctx.lineTo(this.getCoordinates().x7, this.getCoordinates().y7 - 30)
        ctx.stroke()

        this.drawHandle(this.getCoordinates().x8, this.getCoordinates().y8, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().x7, this.getCoordinates().y7, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().x6, this.getCoordinates().y6, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().x5, this.getCoordinates().y5, this.handleRadius, '#a0a0a0', 'white', 4)
        this.drawHandle(this.getCoordinates().x4, this.getCoordinates().y4, this.handleRadius, '#a0a0a0', 'white', 4)
        this.drawHandle(this.getCoordinates().x3, this.getCoordinates().y3, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().x2, this.getCoordinates().y2, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().x1, this.getCoordinates().y1, this.handleRadius, '#a0a0a0', 'white', 4);
        //rotationHandle
        this.drawHandle(this.getCoordinates().x7, this.getCoordinates().y7 - 30, this.handleRadius, '#a0a0a0', 'orange', 4);
    }

    onHandles(x, y) { // check if the cursor is on handles

        if (x > this.getCoordinates().x8 - this.closeEnough && x < this.getCoordinates().x8 + this.closeEnough && y > this.getCoordinates().y8 - this.closeEnough && y < this.getCoordinates().y8 + this.closeEnough) {
            return ('topLeft');

        } else if (x > this.getCoordinates().x7 - this.closeEnough && x < this.getCoordinates().x7 + this.closeEnough && y > this.getCoordinates().y7 - this.closeEnough && y < this.getCoordinates().y7 + this.closeEnough) {
            return ("topMiddle")

        } else if (x > this.getCoordinates().x6 - this.closeEnough && x < this.getCoordinates().x6 + this.closeEnough && y > this.getCoordinates().y6 - this.closeEnough && y < this.getCoordinates().y6 + this.closeEnough) {
            return ('topRight');

        } else if (x > this.getCoordinates().x5 - this.closeEnough && x < this.getCoordinates().x5 + this.closeEnough && y > this.getCoordinates().y5 - this.closeEnough && y < this.getCoordinates().y5 + this.closeEnough) {
            return ("leftMiddle")

        } else if (x > this.getCoordinates().x4 - this.closeEnough && x < this.getCoordinates().x4 + this.closeEnough && y > this.getCoordinates().y4 - this.closeEnough && y < this.getCoordinates().y4 + this.closeEnough) {
            return ("rightMiddle")

        } else if (x > this.getCoordinates().x3 - this.closeEnough && x < this.getCoordinates().x3 + this.closeEnough && y > this.getCoordinates().y3 - this.closeEnough && y < this.getCoordinates().y3 + this.closeEnough) {
            return ('bottomLeft');

        } else if (x > this.getCoordinates().x2 - this.closeEnough && x < this.getCoordinates().x2 + this.closeEnough && y > this.getCoordinates().y2 - this.closeEnough && y < this.getCoordinates().y2 + this.closeEnough) {
            return ("bottomMiddle")

        } else if (x > this.getCoordinates().x1 - this.closeEnough && x < this.getCoordinates().x1 + this.closeEnough && y > this.getCoordinates().y1 - this.closeEnough && y < this.getCoordinates().y1 + this.closeEnough) {
            return ('bottomRight');
        } else if (x > this.getCoordinates().x7 - this.closeEnough && x < this.getCoordinates().x7 + this.closeEnough && y > (this.getCoordinates().y7 - 30) - this.closeEnough && y < (this.getCoordinates().y7 - 30) + this.closeEnough) {
            return ("rotation")
        }
    }
    drag(mouseX, mouseY, dragX, dragY) {
        this.startX = mouseX - dragX;
        this.startY = mouseY - dragY;
    }

    resize(mouseX, mouseY, resizingFrom) {
        if (resizingFrom == 'topLeft') {
            this.w += this.startX - mouseX;
            this.h += this.startY - mouseY;
            this.startX = mouseX;
            this.startY = mouseY;

        } else if (resizingFrom == 'topMiddle') {
            this.h += this.startY - mouseY;
            this.startY = mouseY

        } else if (resizingFrom == 'topRight') {
            this.w = mouseX - this.startX;
            this.h += this.startY - mouseY
            this.startY = mouseY

        } else if (resizingFrom == 'leftMiddle') {
            this.w += this.startX - mouseX
            this.startX = mouseX

        } else if (resizingFrom == 'rightMiddle') {
            this.w = mouseX - this.startX

        } else if (resizingFrom == 'bottomLeft') {
            this.w += this.startX - mouseX
            this.h = mouseY - this.startY
            this.startX = mouseX

        } else if (resizingFrom == 'bottomMiddle') {
            this.h = mouseY - this.startY;

        } else if (resizingFrom == 'bottomRight') {

            this.w = mouseX - this.startX;
            this.h = mouseY - this.startY;

        } else if (resizingFrom == 'rotation') {
            /*
            let centerX = myState.selection.getCoordinates().startX+myState.selection.w*0.5,
                centerY =  myState.selection.getCoordinates().startY+myState.selection.h*0.5;
            myState.selection.toAngle = Math.atan2(mouse.y - centerY , mouse.x - centerX) 
                
            let cos = Math.cos,
                sin = Math.sin;
             
myState.selection.x8 = centerX + (myState.selection.x8-centerX) * cos(myState.selection.toAngle) - (myState.selection.y8 - centerY) * sin(myState.selection.toAngle);
myState.selection.y8 = centerY + (myState.selection.x8-centerX) * sin(myState.selection.toAngle) + (myState.selection.y8 - centerY) * cos(myState.selection.toAngle);
myState.selection.x6 = centerX + (myState.selection.x6-centerX) * cos(myState.selection.toAngle) - (myState.selection.y6 - centerY) * sin(myState.selection.toAngle);
myState.selection.y6 = centerY + (myState.selection.x6-centerX) * sin(myState.selection.toAngle) + (myState.selection.y6 - centerY) * cos(myState.selection.toAngle);
myState.selection.x3 = centerX + (myState.selection.x3-centerX) * cos(myState.selection.toAngle) - (myState.selection.y3 - centerY) * sin(myState.selection.toAngle);
myState.selection.y3 = centerY + (myState.selection.x3-centerX) * sin(myState.selection.toAngle) + (myState.selection.y3 - centerY) * cos(myState.selection.toAngle);
myState.selection.x1 = centerX + (myState.selection.x1-centerX) * cos(myState.selection.toAngle) - (myState.selection.y1 - centerY) * sin(myState.selection.toAngle);
myState.selection.y1 = centerY + (myState.selection.x1-centerX) * sin(myState.selection.toAngle) + (myState.selection.y1 - centerY) * cos(myState.selection.toAngle);
myState.selection.startX = centerX + (myState.selection.startX-centerX) * cos(myState.selection.toAngle) - (myState.selection.startY - centerY) * sin(myState.selection.toAngle);
myState.selection.startY = centerY + (myState.selection.startY-centerX) * sin(myState.selection.toAngle) + (myState.selection.startY - centerY) * cos(myState.selection.toAngle);
*/
        }
    }
}

class Triangle extends Shape {

    constructor(options) {
        super(options);
        this.type = 'triangle'
    }


    draw(ctx) {

        //draw
        ctx.beginPath();
        ctx.moveTo(this.getCoordinates().startX, this.getCoordinates().endY);
        ctx.lineTo((this.getCoordinates().startX + this.getCoordinates().endX) / 2, this.getCoordinates().startY);
        ctx.lineTo(this.getCoordinates().endX, this.getCoordinates().endY);
        ctx.closePath();
        //fill
        ctx.fillStyle = this.fillColor;
        ctx.fill();

        //outline
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.outline;
        ctx.stroke();

    }

    // check if the cursor is on a triangle 
    insideShape(x, y) {

        // a func to get a triangle's area
        function TriangleArea(x1, y1, x2, y2, x3, y3) {
            return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
        }



        const A = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x7, this.getCoordinates().y7, this.getCoordinates().x3, this.getCoordinates().y3);
        const A1 = TriangleArea(x, y, this.getCoordinates().x7, this.getCoordinates().y7, this.getCoordinates().x3, this.getCoordinates().y3);
        const A2 = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, x, y, this.getCoordinates().x3, this.getCoordinates().y3);
        const A3 = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x7, this.getCoordinates().y7, x, y);

        return (A === A1 + A2 + A3 || // inside triangle
            //or on handles outside the triangle (handles won't work if they are outside the shape)
            x > this.getCoordinates().x8 - this.closeEnough && x < this.getCoordinates().x8 + this.closeEnough && y > this.getCoordinates().y8 - this.closeEnough && y < this.getCoordinates().y8 + this.closeEnough || //top left
            x > this.getCoordinates().x6 - this.closeEnough && x < this.getCoordinates().x6 + this.closeEnough && y > this.getCoordinates().y6 - this.closeEnough && y < this.getCoordinates().y6 + this.closeEnough || // top right
            x > this.getCoordinates().x5 - this.closeEnough && x < this.getCoordinates().x5 + this.closeEnough && y > this.getCoordinates().y5 - this.closeEnough && y < this.getCoordinates().y5 + this.closeEnough ||  //left middle
            x > this.getCoordinates().x4 - this.closeEnough && x < this.getCoordinates().x4 + this.closeEnough && y > this.getCoordinates().y4 - this.closeEnough && y < this.getCoordinates().y4 + this.closeEnough) // right middle

    }

    drawConnectors() {

        this.drawHandle(this.getCoordinates().x7, this.startY, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.startX, this.getCoordinates().y3, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x2, this.getCoordinates().y2, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x1, this.getCoordinates().y1, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
    }


}

class Rectangle extends Shape {
    constructor(options) {
        super(options);
        this.type = 'rectangle'
    }
    draw(ctx) {
        //console.log("drew a rectangle")
        //draw
        ctx.beginPath();
        ctx.rect(this.getCoordinates().startX, this.getCoordinates().startY, this.w, this.h);
        ctx.closePath();


        //fill
        ctx.fillStyle = this.fillColor;
        ctx.fill();

        //outline
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.outline;
        ctx.stroke();
    }

    insideShape(x, y) {
        //console.log("entered insideShape")
        // a func to get a triangle's area
        function TriangleArea(x1, y1, x2, y2, x3, y3) {
            return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
        }

        // we divide the rect into two triangles and check if (x,y) is in one of them
        const firstHalfTriangle = TriangleArea(this.getCoordinates().x3, this.getCoordinates().y3, this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x8, this.getCoordinates().y8);
        const secondHalfTriangle = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x8, this.getCoordinates().y8, this.getCoordinates().x6, this.getCoordinates().y6)

        // checking first triangle 
        const A1 = TriangleArea(x, y, this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x8, this.getCoordinates().y8);
        const A2 = TriangleArea(this.getCoordinates().x3, this.getCoordinates().y3, x, y, this.getCoordinates().x8, this.getCoordinates().y8);
        const A3 = TriangleArea(this.getCoordinates().x3, this.getCoordinates().y3, this.getCoordinates().x1, this.getCoordinates().y1, x, y);

        // checking second triangle
        const A4 = TriangleArea(x, y, this.getCoordinates().x8, this.getCoordinates().y8, this.getCoordinates().x6, this.getCoordinates().y6);
        const A5 = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, x, y, this.getCoordinates().x6, this.getCoordinates().y6);
        const A6 = TriangleArea(this.getCoordinates().x1, this.getCoordinates().y1, this.getCoordinates().x8, this.getCoordinates().y8, x, y);

        return (firstHalfTriangle === A1 + A2 + A3 || secondHalfTriangle === A4 + A5 + A6) // inside the triangle



    }
    drawConnectors() {
        this.drawHandle(this.startX, this.startY, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x7, this.startY, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x6, this.startY, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.startX, this.getCoordinates().y5, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x6, this.getCoordinates().y4, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.startX, this.getCoordinates().y3, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x7, this.getCoordinates().y2, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().x6, this.getCoordinates().y1, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
    }
}

class Ellipse extends Shape {

    constructor(options) {
        super(options);
        this.w = options.cw
        this.h = options.ch
        this.type = 'ellipse'
    }

    select(ctx) {

        //style
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        ctx.beginPath();
        ctx.moveTo(this.getCoordinates().cx1, this.getCoordinates().cy1);
        ctx.setLineDash([5, 10]); // dashed line 
        ctx.rect(this.getCoordinates().cx5, this.getCoordinates().cy5, this.w * 2, this.h * 2)
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]); // solid line 
        ctx.beginPath()
        ctx.moveTo(this.getCoordinates().cx6, this.getCoordinates().cy6)
        ctx.lineTo(this.getCoordinates().cx6, this.getCoordinates().cy6 - 30)
        ctx.stroke()


        this.drawHandle(this.getCoordinates().cx1, this.getCoordinates().cy1, this.handleRadius, '#a0a0a0', 'white', 4); this.drawHandle(this.getCoordinates().cx2, this.getCoordinates().cy2, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().cx3, this.getCoordinates().cy3, this.handleRadius, '#a0a0a0', 'white', 4); this.drawHandle(this.getCoordinates().cx4, this.getCoordinates().cy4, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().cx5, this.getCoordinates().cy5, this.handleRadius, '#a0a0a0', 'white', 4); this.drawHandle(this.getCoordinates().cx6, this.getCoordinates().cy6, this.handleRadius, '#a0a0a0', 'white', 4);
        this.drawHandle(this.getCoordinates().cx7, this.getCoordinates().cy7, this.handleRadius, '#a0a0a0', 'white', 4); this.drawHandle(this.getCoordinates().cx8, this.getCoordinates().cy8, this.handleRadius, '#a0a0a0', 'white', 4);
        //rotation 
        this.drawHandle(this.getCoordinates().cx6, this.getCoordinates().cy6 - 30, this.handleRadius, '#a0a0a0', 'orange', 4);
    }

    onHandles(x, y) {

        if (x > this.getCoordinates().cx5 - this.closeEnough && x < this.getCoordinates().cx5 + this.closeEnough && y > this.getCoordinates().cy5 - this.closeEnough && y < this.getCoordinates().cy5 + this.closeEnough) {
            return ('topLeft');

        } else if (x > this.getCoordinates().cx6 - this.closeEnough && x < this.getCoordinates().cx6 + this.closeEnough && y > this.getCoordinates().cy6 - this.closeEnough && y < this.getCoordinates().cy6 + this.closeEnough) {
            return ("topMiddle")

        } else if (x > this.getCoordinates().cx7 - this.closeEnough && x < this.getCoordinates().cx7 + this.closeEnough && y > this.getCoordinates().cy7 - this.closeEnough && y < this.getCoordinates().cy7 + this.closeEnough) {
            return ('topRight');

        } else if (x > this.getCoordinates().cx4 - this.closeEnough && x < this.getCoordinates().cx4 + this.closeEnough && y > this.getCoordinates().cy4 - this.closeEnough && y < this.getCoordinates().cy4 + this.closeEnough) {
            return ("leftMiddle")

        } else if (x > this.getCoordinates().cx8 - this.closeEnough && x < this.getCoordinates().cx8 + this.closeEnough && y > this.getCoordinates().cy8 - this.closeEnough && y < this.getCoordinates().cy8 + this.closeEnough) {
            return ("rightMiddle")

        } else if (x > this.getCoordinates().cx3 - this.closeEnough && x < this.getCoordinates().cx3 + this.closeEnough && y > this.getCoordinates().cy3 - this.closeEnough && y < this.getCoordinates().cy3 + this.closeEnough) {
            return ('bottomLeft');

        } else if (x > this.getCoordinates().cx2 - this.closeEnough && x < this.getCoordinates().cx2 + this.closeEnough && y > this.getCoordinates().cy2 - this.closeEnough && y < this.getCoordinates().cy2 + this.closeEnough) {
            return ("bottomMiddle")

        } else if (x > this.getCoordinates().cx1 - this.closeEnough && x < this.getCoordinates().cx1 + this.closeEnough && y > this.getCoordinates().cy1 - this.closeEnough && y < this.getCoordinates().cy1 + this.closeEnough) {
            return ('bottomRight');

        } else if (x > this.getCoordinates().cx6 - this.closeEnough && x < this.getCoordinates().cx6 + this.closeEnough && y > this.getCoordinates().cy6 - 30 - this.closeEnough && y < this.getCoordinates().cy6 - 30 + this.closeEnough) {
            return ("rotation")
        }
    }

    draw(ctx) {
        //draw
        ctx.beginPath();
        ctx.ellipse(this.getCoordinates().startX, this.getCoordinates().startY, this.w, this.h, 0, 0, Math.PI * 2)
        ctx.closePath();
        //fill
        ctx.fillStyle = this.fillColor;
        ctx.fill();

        //outline
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.outline;
        ctx.stroke();

    }

    insideShape(x, y) {

        //Mathematical eqm to know if a point is inside ellipse 
        let bounded = (Math.pow(x - this.startX, 2) / Math.pow(this.w, 2)) + (Math.pow(y - this.startY, 2) / Math.pow(this.h, 2));

        return (bounded <= 1 ||
            //or on handles outside the triangle (handles won't work if they are outside the shape)
            x > this.getCoordinates().cx5 - this.closeEnough && x < this.getCoordinates().cx5 + this.closeEnough && y > this.getCoordinates().cy5 - this.closeEnough && y < this.getCoordinates().cy5 + this.closeEnough || // tl
            x > this.getCoordinates().cx7 - this.closeEnough && x < this.getCoordinates().cx7 + this.closeEnough && y > this.getCoordinates().cy7 - this.closeEnough && y < this.getCoordinates().cy7 + this.closeEnough || // tr
            x > this.getCoordinates().cx3 - this.closeEnough && x < this.getCoordinates().cx3 + this.closeEnough && y > this.getCoordinates().cy3 - this.closeEnough && y < this.getCoordinates().cy3 + this.closeEnough || // bl
            x > this.getCoordinates().cx1 - this.closeEnough && x < this.getCoordinates().cx1 + this.closeEnough && y > this.getCoordinates().cy1 - this.closeEnough && y < this.getCoordinates().cy1 + this.closeEnough) // br
    }

    drawConnectors() {

        this.drawHandle(this.getCoordinates().cx2, this.getCoordinates().cy2, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().cx4, this.getCoordinates().cy4, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().cx6, this.getCoordinates().cy6, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
        this.drawHandle(this.getCoordinates().cx8, this.getCoordinates().cy8, this.connectorRadius, '#00ff00', '#00ff00', 0.2);
    }

    resize(mouseX, mouseY, resizingFrom) {

        if (resizingFrom == 'topLeft') {
            this.w = Math.abs(this.startX - mouseX);
            this.h = Math.abs(this.startY - mouseY);

        } else if (resizingFrom == 'topMiddle') {
            this.h = Math.abs(this.startY - mouseY);

        } else if (resizingFrom == 'topRight') {
            this.w = Math.abs(mouseX - this.startX);
            this.h = Math.abs(this.startY - mouseY)

        } else if (resizingFrom == 'leftMiddle') {
            this.w = Math.abs(this.startX - mouseX)

        } else if (resizingFrom == 'rightMiddle') {
            this.w = Math.abs(mouseX - this.startX)

        } else if (resizingFrom == 'bottomLeft') {
            this.w = Math.abs(this.startX - mouseX)
            this.h = Math.abs(mouseY - this.startY)

        } else if (resizingFrom == 'bottomMiddle') {
            this.h = Math.abs(mouseY - this.startY);

        } else if (resizingFrom == 'bottomRight') {

            this.w = Math.abs(mouseX - this.startX);
            this.h = Math.abs(mouseY - this.startY);

        } else if (resizingFrom == 'rotation') {
            /*
                let centerX = myState.selection.startX ,
                    centerY = myState.selection.startY ;

                myState.selection.toAngle = Math.atan2(mouse.y - centerY, mouse.x - centerX );
*/
        }
    }
}

class Line extends Shape {
    constructor(options) {
        super(options)
        this.type = "line";
        this.endX = options.endX;
        this.endY = options.endY;

    }
    draw(ctx) {

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);

        //style
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeStyle = this.outline
        ctx.stroke();
        ctx.closePath()
    }

    select(ctx) {

        //style
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        //draw
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.setLineDash([2, 5]); // dashed line
        ctx.lineTo(this.endX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.lineTo(this.startX, this.endY);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]) // solid line 

        this.drawHandle(this.startX, this.startY, this.handleRadius, '#a0a0a0', 'white', 4)
        this.drawHandle(this.endX, this.endY, this.handleRadius, '#a0a0a0', 'white', 4)

    }

    onHandles(x, y) {
        if (x > this.startX - this.closeEnough && x < this.startX + this.closeEnough && y > this.startY - this.closeEnough && y < this.startY + this.closeEnough) {
            return "leftMiddle";

        } else if (x > this.endX - this.closeEnough && x < this.endX + this.closeEnough && y > this.endY - this.closeEnough && y < this.endY + this.closeEnough) {
            return "rightMiddle";
        }
    }
    insideShape(x, y) {
        let x1 = this.startX, x2 = this.endX, y1 = this.startY, y2 = this.endY;

        function distance(x2, x1, y2, y1) {
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
        }
        // A-C------B
        let d = distance(x, x1, y, y1) + distance(x2, x, y2, y)
        return d > distance(x2, x1, y2, y1) - 3 && d < distance(x2, x1, y2, y1) + 3

    }

    drag(mouseX, mouseY, dragX, dragY) {
        // // calc how far mouse has moved since last mousemove event
        let dx = mouseX - this.startX - dragX,
            dy = mouseY - this.startY - dragY;
        this.startX += dx
        this.startY += dy
        this.endX += dx
        this.endY += dy;
    }

    resize(mouseX, mouseY, resizingFrom) {
        if (resizingFrom == 'leftMiddle') {
            this.startX = mouseX
            this.startY = mouseY

        } else if (resizingFrom == 'rightMiddle') {
            this.endX = mouseX;
            this.endY = mouseY;
        }
    }
}

class Arrow extends Line {
    constructor(options) {
        super(options);
        this.type = 'arrow'
        this.arrowFeature = options.arrowFeature;
        this.connectedToShape = []; // we store the id of shapes connected to this arrow  
    }

    draw(ctx) {
        /*
                ctx.beginPath()
                    var r = 10; // length of head in pixels
        
                    var angle = Math.atan2(this.endY - this.startY, this.endX - this.startX)
                    ctx.moveTo(this.startX, this.startY);
                    ctx.lineTo(this.endX, this.endY);
                    ctx.moveTo(this.endX, this.endY);
                    ctx.lineTo(this.endX - r * Math.cos(angle - Math.PI / 6), this.endY - r * Math.sin(angle - Math.PI / 6));
                    ctx.moveTo(this.endX, this.endY);
                    ctx.lineTo(this.endX - r * Math.cos(angle + Math.PI / 6), this.endY - r * Math.sin(angle + Math.PI / 6));
                            //style
                ctx.lineWidth = this.outlineWidth;
                ctx.strokeStyle = this.outline
                ctx.stroke();
                ctx.lineCap = 'round'
                ctx.closePath()  
        
        /*/

        var headlen = 6,
            angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
        // This makes it so the end of the arrow head is located at tox, toy, don't ask where 1.15 comes from
        var endX = this.endX - Math.cos(angle) * ((this.outlineWidth * 1.15));
        var endY = this.endY - Math.sin(angle) * ((this.outlineWidth * 1.15));
        var startX = this.startX + Math.cos(angle) * ((this.outlineWidth * 1.15));
        var startY = this.startY + Math.sin(angle) * ((this.outlineWidth * 1.15));
        ctx.beginPath();

        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        //starting a new path from the head of the arrow to one of the sides of the point
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 7), endY - headlen * Math.sin(angle + Math.PI / 7));

        //path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctx.lineTo(endX, endY);
        ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));

        if (this.arrowFeature == "twoHeadArrow") {

            //starting a new path from the head of the arrow to one of the sides of the point
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + headlen * Math.cos(angle - Math.PI / 7), startY + headlen * Math.sin(angle - Math.PI / 7));

            //path from the side point of the arrow, to the other side point
            ctx.lineTo(startX + headlen * Math.cos(angle + Math.PI / 7), startY + headlen * Math.sin(angle + Math.PI / 7));

            //path from the side point back to the tip of the arrow, and then again to the opposite side point
            ctx.lineTo(startX, startY);
            ctx.lineTo(startX + headlen * Math.cos(angle - Math.PI / 7), startY + headlen * Math.sin(angle - Math.PI / 7));

        }

        //draws the paths created above
        ctx.strokeStyle = this.outline;
        ctx.lineWidth = this.outlineWidth;
        ctx.stroke();


    }

    drag(mouseX, mouseY, dragX, dragY) {
        // // calc how far mouse has moved since last mousemove event
        let dx = mouseX - this.startX - dragX,
            dy = mouseY - this.startY - dragY;
        this.startX += dx
        this.startY += dy
        this.endX += dx
        this.endY += dy;
    }

}

class Path extends Shape {
    constructor(options) {
        super(options)
        this.type = "path"
        this.px = options.px
        this.py = options.py
        this.xArray = options.xArray
        this.yArray = options.yArray
    }

    draw(ctx) {

        for (let i = 0; i < this.xArray.length; i++) {
            ctx.beginPath()
            ctx.moveTo(this.xArray[i - 1], this.yArray[i - 1])
            ctx.lineTo(this.xArray[i], this.yArray[i])
            ctx.closePath()
            ctx.strokeStyle = this.outline;
            ctx.lineWidth = this.outlineWidth;
            ctx.lineCap = "round"
            ctx.stroke()

        }



    }
    insideShape(x, y) {
        for (let i = 0; i <= this.xArray.length; i++) {
            if (x + 10 > this.xArray[i] && x - 10 < this.xArray[i]) {
                if (y + 10 > this.yArray[i] && y - 10 < this.yArray[i]) {
                    return true;
                }
            }
        }
    }
    onHandles() {
        return false
    }
    select(ctx) {
        let highestX = Math.max.apply(Math, this.xArray),
            lowestX = Math.min.apply(Math, this.xArray),
            highestY = Math.max.apply(Math, this.yArray),
            lowestY = Math.min.apply(Math, this.yArray);

        //style
        ctx.strokeStyle = this.selectionColor;
        ctx.lineWidth = this.selectionWidth;
        //draw
        ctx.beginPath();
        ctx.moveTo(lowestX, lowestY);
        ctx.setLineDash([2, 5]); // dashed line
        ctx.lineTo(highestX, lowestY);
        ctx.lineTo(highestX, highestY);
        ctx.lineTo(lowestX, highestY);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]) // solid line 
    }

    drag(mouseX, mouseY, dragX, dragY) {
        let distanceX = mouseX - dragX - this.xArray[0],
            distanceY = mouseY - dragY - this.yArray[0];
        for (let i = 0; i < this.xArray.length; i++) {
            this.xArray[i] += distanceX;
            this.yArray[i] += distanceY;
        }
    }
}

class Text extends Shape {

    constructor(options) {
        super(options)
        this.text = ''
        this.type = 'text'
    }

    draw(ctx) {

        ctx.beginPath()
        ctx.fillStyle = this.fillColor
        let size = String(this.outlineWidth * 10)

        ctx.font = size + "px " + "Arial";

        ctx.fillText(this.text, this.startX, this.startY)
        ctx.fill()
        ctx.closePath()

    }


    insideShape(mx, my) {
        let width = this.w * this.outlineWidth * 0.5, // we wanna increas the width when we increase the font 
            height = this.h * this.outlineWidth * 0.5; // we wanna increase th height when we increase the font 
        return mx > this.startX && mx < this.startX + width && my < this.startY && my > this.startY - height
    }

    onHandles() {
        return false
    }

    select(ctx) {
        ctx.strokeStyle = this.selectionColor
        ctx.lineWidth = this.selectionWidth
        let width = this.w * this.outlineWidth * 0.5, // we wanna increas the width when we increase the font 
            height = this.h * this.outlineWidth * 0.5; // we wanna increase th height when we increase the font 
        ctx.rect(this.startX, this.startY + 4, width, -height)
        ctx.stroke()
    }
}



function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.valid = false; // the canvas is invalid we need to redraw
    this.shapes = []; // the collection of triangles to be drawn
    this.selection = null;

    // new triangle being constructed
    this.constructing = null;

    this.shapeChosen = null //  a flag variable to know if a shape button is pressed to drop it on canvas
    this.doing = null; // to keep track of what we're doing (editing, dragging resizing, or constructing new shape)
    const myState = this;


    var reader = new FileReader();
    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);

    let mouseOver;
    document.getElementById('container').onmouseover = () => { mouseOver = true; myState.doing = 'editing'; }
    // if we are using tool bar we wanna keep selection
    document.getElementById('container').onmouseout = () => { mouseOver = false; myState.doing = null }


    document.getElementById('save').addEventListener('click', function () {

        var data = JSON.stringify(myState.shapes, null, 2); // get the array of shapes and apply stringify on it and save it as a jsonfile

        var file = new Blob([data], { type: 'application/json' }); //put the data in a blob
        // create <a>
        var a = document.createElement('a');
        a.href = URL.createObjectURL(file)
        a.download = 'project.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    document.getElementById('load').addEventListener('change', function () { //load a json file 

        if (this.files[0]) {
            reader.readAsText(this.files[0]);
        }

    });

    reader.onload = function () { // iterate over each saved object in the json file and draw the shapes depending on it's type
        var data = JSON.parse(reader.result);

        for (var i = 0; i < data.length; i++) {

            let options = {
                startX: data[i].startX,
                startY: data[i].startY,
                px: mx,
                py: my,
                endX: data[i].endX,
                endY: data[i].endY,
                w: data[i].w,
                h: data[i].h,
                cw: data[i].w,
                ch: data[i].h,
                fillColor: data[i].fillColor,
                outline: data[i].outline,
                outlineWidth: data[i].outlineWidth,
                arrowFeature: data[i].arrowFeature,
                xArray: data[i].xArray,
                yArray: data[i].yArray,
                id: data[i].id
            }

            switch (data[i].type) {

                case "triangle": myState.addShape(new Triangle(options)); break;
                case "rectangle": myState.addShape(new Rectangle(options)); break;
                case "ellipse": myState.addShape(new Ellipse(options)); break;
                case "line": myState.addShape(new Line(options)); break;
                case "path": myState.addShape(new Path(options)); break;
                case "arrow": myState.addShape(new Arrow(options)); break;
                case "text": myState.addShape(new Text(options)); break;

            }
            if (data[i].type == 'arrow') { // add the id's of shapes connected to arrows
                myState.shapes[i].connectedToShape = data[i].connectedToShape
            } else if (data[i].type == 'text') {
                myState.shapes[i].text = data[i].text
            }
            myState.shapes[i].id = data[i].id
        }
    }
    document.getElementById('test').onclick = () => {
        console.log(myState.shapes)
    }
    document.getElementById('clear').onclick = function () {
        myState.shapes = []
        myState.selection = null // remove also selection borders if a shape was clicked before clearing
    }

    function setColor(color, e) {
        if (myState.selection) {
            if (document.getElementById('fillcolors').contains(e.target)) {
                myState.selection.fillColor = color;
            } else if (document.getElementById('outlinecolor').contains(e.target))
                myState.selection.outline = color
        }
        var active = document.getElementsByClassName('active')[0]
        if (active) {
            active.className = 'swatch'
        }
    }
    function setSwatch(e) {
        var swatch = e.target;
        setColor(swatch.style.backgroundColor, e);
        swatch.className += ' active'
    }

    let colors = ['rgb(255, 255, 255)', 'rgb(187, 187, 243)', 'rgb(247, 183, 183)', 'rgb(247, 178, 132)', 'rgb(167, 248, 167)', 'rgb(250, 250, 153)',
        'rgb(187, 185, 185)', 'rgb(152, 152, 243)', 'rgb(243, 141, 141)', 'rgb(247, 154, 93)', 'rgb(134, 252, 134)', 'rgb(252, 252, 128)',
        'rgb(134, 133, 133) ', 'rgb(114, 114, 245) ', 'rgb(247, 101, 101)', 'rgb(243, 136, 65)', 'rgb(97, 245, 97)', 'rgb(250, 250, 91)',
        'rgb(63, 62, 62) ', 'rgb(36, 36, 240) ', 'rgb(241, 32, 32)', 'rgb(241, 109, 21)', 'rgb(12, 241, 12)', 'rgb(245, 245, 31)',
        'rgb(17, 17, 17) ', 'rgb(3, 3, 70)', 'rgb(77, 4, 4)', 'rgb(95, 41, 4)', 'rgb(5, 75, 5)', 'rgb(116, 116, 4)'];


    let format = ['outline1', 'fillcolors1'];

    for (let i = 0; i < format.length; i++) {
        for (let j = 0, n = colors.length; j < n; j++) {
            let swatch = document.createElement('div');
            swatch.className = 'swatch';
            swatch.style.backgroundColor = colors[j];
            swatch.style.hover = colors[j];
            document.getElementById(format[i]).appendChild(swatch);
            swatch.addEventListener('click', setSwatch)

        }
    }



    let arrayShapes = ['triangle', 'rect', 'ellipse', 'line', 'path', 'delete', 'text']
    for (let i = 0; i < arrayShapes.length; i++) {
        document.getElementById(arrayShapes[i]).onclick = function () {
            myState.shapeChosen = arrayShapes[i];

        }
    }
    //arrows
    let arrows = ["oneHeadArrow", "twoHeadArrow"];
    for (let i = 0; i < arrows.length; i++) {
        document.getElementById(arrows[i]).onclick = () => {
            myState.shapeChosen = 'arrow'
            myState.arrowFeature = arrows[i];
        }
    }
    let fillAndOutline = ["noFill", "noOutline"]
    for (let i = 0; i < fillAndOutline.length; i++) {
        let button = document.getElementById(fillAndOutline[i])
        button.onclick = () => {
            if (myState.selection) {
                if (button.checked) {
                    if (i == 0) {
                        myState.selection.fillColor = "#00ff0000"
                    } else {
                        myState.selection.outline = "#00ff0000"
                    }
                    button.checked = false
                }
            }
        }
    }

    let moreColorsAndWidthButtons = ["outlineWidth", "fillColor", "outline"]
    for (let i = 0; i < moreColorsAndWidthButtons.length; i++) {
        let button = document.getElementById(moreColorsAndWidthButtons[i])
        button.addEventListener('input', () => {
            let value = button.value
            if (myState.selection) {
                myState.selection[moreColorsAndWidthButtons[i]] = value
            }
            myState.valid = false
        })
    }

    document.addEventListener('mousedown', function (e) {

        myState.mousedown = true
        let mouse = myState.getMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let shapes = myState.shapes;
        let l = shapes.length;

        // check if the cursor is on one of the triangles  
        for (let i = l - 1; i >= 0; i--) {

            if (shapes[i].insideShape(mx, my) || shapes[i].onHandles(mx, my)) {

                if (myState.shapeChosen == 'delete') {

                    shapes.splice(i, 1);
                    myState.shapeChosen = null
                    myState.valid = false
                    break;
                }

                let mySel = shapes[i];
                myState.selection = mySel;
                myState.valid = false;
                myState.doing = "resizing"

                // we don't wanna drag the shape from the corner so keep track of where clicked 
                if (mySel.type == "path") {
                    myState.dragX = mx - mySel.xArray[0];
                    myState.dragY = my - mySel.yArray[0];
                } else {
                    myState.dragX = mx - mySel.startX;
                    myState.dragY = my - mySel.startY;
                }


                myState.resizingFrom = shapes[i].onHandles(mx, my)

                if (!myState.resizingFrom) { myState.doing = 'dragging' }

                return; /* we don't wanna draw a new triangle, we wanna drag an existing one so no need to continue in the function*/
            }
        }
        if (myState.doing != 'editing') {
            myState.selection = null
            myState.valid = false;
        }


        // this part means that no shape was selected and we wanna create a new one 
        myState.doing = "newShape";
        let options = {
            startX: mx,
            startY: my,
            px: mx,
            py: my,
            xArray: [],
            yArray: [],
            endX: mx,
            endY: my,
            w: 0,
            h: 0,
            cw: 0, // circle width 
            ch: 0,
            fillColor: '#4472c4',
            outline: '#2f528f',
            outlineWidth: 2,
            arrowFeature: myState.arrowFeature,
            id: null

        }

        switch (myState.shapeChosen) {

            case "triangle": myState.addShape(new Triangle(options)); break;
            case "rect": myState.addShape(new Rectangle(options)); break;
            case "ellipse": myState.addShape(new Ellipse(options)); break;
            case "line": myState.addShape(new Line(options)); break;
            case "path": myState.addShape(new Path(options)); break;
            case "arrow": myState.addShape(new Arrow(options)); break;
            case "text": myState.addShape(new Text(options)); break
        }

        myState.constructing = myState.shapes[myState.shapes.length - 1]; /* the SHAPE that's being drawn( last SHAPE in array)*/

        if (myState.constructing)
            myState.constructing.id = "" + Math.random() * myState.shapes.length // generate an id from a random number if we are drawing a new shape 

        if (myState.shapeChosen == "text") {

            document.removeEventListener('keydown', myKeydown)
            document.addEventListener('keydown', myKeydown)
            function myKeydown(e) {



                if (e.keyCode === 13) {//enter key is pressed
                    //myState.constructing.startX = startingX;
                }

                let text = e.keyCode === 8 || e.keyCode === 13 || e.keyCode === 16 || e.keyCode === 9 ||
                    e.keyCode === 17 || e.keyCode === 18 || e.keyCode === 27 || e.keyCode === 20
                    || e.keyCode === 46 || e.keyCode === 35 || e.keyCode === 36 || e.keyCode === 33
                    || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40
                    || e.keyCode === 34 || e.keyCode === 144 || e.keyCode === 91 || e.keyCode === 255 ? "" : e.key


                myState.constructing.text += text
                myState.valid = false

                myState.constructing.w = myState.ctx.measureText(myState.constructing.text).width;
                myState.constructing.h = myState.ctx.measureText("M").width                         // it gives you approx the same height since there is no prebuilt function forheight

                //myState.constructing.startX += myState.ctx.measureText(text).width;

                document.addEventListener('mousedown', () => {
                    //        console.log(myState.selection.insideShape(mx))
                    if (!myState.constructing.insideShape(mx, my))
                        document.removeEventListener('keydown', myKeydown)
                })
            }

            myState.valid = false;
        }

    }, true);


    document.addEventListener('mousemove', function (e) {
        const mouse = myState.getMouse(e);
        //cursor

        if (myState.shapeChosen == "text") {
            document.getElementById('body').style.cursor = "text"
        } else if (myState.shapeChosen) {
            document.getElementById('body').style.cursor = "grabbing"
        } else {
            document.getElementById('body').style.cursor = "crosshair"
        }
        for (let i = 0; i < myState.shapes.length; i++) {
            let shape = myState.shapes[i]

            if (myState.selection) {
                if (shape.insideShape(mouse.x, mouse.y)) {
                    document.getElementById('body').style.cursor = "move"
                }
                if (shape.onHandles(mouse.x, mouse.y) == "topLeft") {
                    if (shape.getCoordinates().x8 < shape.getCoordinates().x6 || shape.getCoordinates().y8 < shape.getCoordinates().y3) {
                        document.getElementById('body').style.cursor = "nw-resize"
                    }
                    if (shape.getCoordinates().x8 > shape.getCoordinates().x6 || shape.getCoordinates().y8 > shape.getCoordinates().y3) {
                        document.getElementById('body').style.cursor = "nesw-resize"
                    }
                }
                if (shape.onHandles(mouse.x, mouse.y) == "topMiddle") {
                    document.getElementById('body').style.cursor = "n-resize"
                }
                if (shape.onHandles(mouse.x, mouse.y) == "topRight") {

                    if (shape.getCoordinates().x6 > shape.getCoordinates().x8 || shape.getCoordinates().y6 < shape.getCoordinates().y1) {
                        document.getElementById('body').style.cursor = "nesw-resize"
                    }
                    if (shape.getCoordinates().x6 < shape.getCoordinates().x8 || shape.getCoordinates().y6 > shape.getCoordinates().y1) {
                        document.getElementById('body').style.cursor = "nw-resize"
                    }
                }
                if (shape.onHandles(mouse.x, mouse.y) == "leftMiddle") {
                    document.getElementById('body').style.cursor = "w-resize"
                }
                if (shape.onHandles(mouse.x, mouse.y) == "rightMiddle") {
                    document.getElementById('body').style.cursor = "w-resize"
                }
                if (shape.onHandles(mouse.x, mouse.y) == "bottomLeft") {

                    if (shape.getCoordinates().x3 < shape.getCoordinates().x1 || shape.getCoordinates().y3 > shape.getCoordinates().y8) {
                        document.getElementById('body').style.cursor = "sw-resize"
                    }
                    if (shape.getCoordinates().x3 > shape.getCoordinates().x1 || shape.getCoordinates().y3 < shape.getCoordinates().y8) {
                        document.getElementById('body').style.cursor = "nw-resize"
                    }
                }
                if (shape.onHandles(mouse.x, mouse.y) == "bottomMiddle") {
                    document.getElementById('body').style.cursor = "n-resize"
                }
                if (shape.onHandles(mouse.x, mouse.y) == "bottomRight") {

                    if (shape.getCoordinates().x1 > shape.getCoordinates().x3 || shape.getCoordinates().y1 > shape.getCoordinates().y6) {
                        document.getElementById('body').style.cursor = "se-resize"
                    }
                    if (shape.getCoordinates().x1 < shape.getCoordinates().x3 || shape.getCoordinates().y1 < shape.getCoordinates().y6) {
                        document.getElementById('body').style.cursor = "sw-resize"
                    }
                }
                if (!shape.insideShape(mouse.x, mouse.y) && !shape.onHandles(mouse.x, mouse.y)) {
                    document.getElementById('body').style.cursor = "crosshair"
                }
            }
        }

        switch (myState.doing) {
            case "resizing":

                myState.selection.resize(mouse.x, mouse.y, myState.resizingFrom);


                if (myState.selection.type == 'arrow') {
                    // iterate over shape is arrow is on handles of a shape fix the arrow with the handle
                    for (let i = 0; i < myState.shapes.length; i++) {
                        var shape = myState.shapes[i];

                        if (shape.type != "line" && shape.type != "path" && shape.type != 'arrow' && myState.selection) { // optimization because no need to check lines or path 

                            let ArrowHandle = myState.selection.onHandles(mouse.x, mouse.y) // check if handle of arrow is on handles of shape
                            let shapeHandle, index, x, y;

                            if (ArrowHandle == "leftMiddle") { // check arrow connected from topLeft
                                index = 0;
                                x = 'startX';
                                y = 'startY';
                            } else if (ArrowHandle = "rightMiddle") { // check if arrow connected from top right 
                                index = 1;
                                x = 'endX';
                                y = 'endY';
                            }
                            shapeHandle = shape.onHandles(mouse.x, mouse.y)

                            //check if arrow is inside shape and show connectors to help user
                            if (shape.insideShape(mouse.x, mouse.y) || shape.onHandles(mouse.x, mouse.y)) {
                                myState.toBeConnected = shape;

                            } else {
                                myState.toBeConnected = null;
                            }

                            if (shape.type == 'ellipse') {
                                if (shapeHandle == "leftMiddle") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'leftMiddle' };
                                    myState.selection[x] = shape.getCoordinates().cx4;
                                    myState.selection[y] = shape.getCoordinates().cy4; break;

                                } else if (shapeHandle == "rightMiddle") {

                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'rightMiddle' };
                                    myState.selection[x] = shape.getCoordinates().cx8
                                    myState.selection[y] = shape.getCoordinates().cy8; break;

                                } else if (shapeHandle == "topMiddle") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'topMiddle' };
                                    myState.selection[x] = shape.getCoordinates().cx6
                                    myState.selection[y] = shape.getCoordinates().cy6; break;

                                } else if (shapeHandle == "bottomMiddle") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'bottomMiddle' };
                                    myState.selection[x] = shape.getCoordinates().cx2
                                    myState.selection[y] = shape.getCoordinates().cy2; break;

                                } else if (shapeHandle == undefined) {
                                    if (myState.doing == "dragging")   // if we moved the arrow from the middle (dragging) remove both connections(left and right) 
                                        myState.selection.connectedToShape = {}
                                    myState.selection.connectedToShape[index] = {}
                                }
                            }

                            else {
                                if (shapeHandle == "topLeft" && shape.type == 'rectangle') {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'topLeft' };
                                    myState.selection[x] = shape.getCoordinates().x8
                                    myState.selection[y] = shape.getCoordinates().y8; break;

                                } else if (shapeHandle == 'topRight' && shape.type == 'rectangle') {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'topRight' };
                                    myState.selection[x] = shape.getCoordinates().x6
                                    myState.selection[y] = shape.getCoordinates().y6; break;

                                } else if (shapeHandle == "bottomLeft") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'bottomLeft' };
                                    myState.selection[x] = shape.getCoordinates().x3
                                    myState.selection[y] = shape.getCoordinates().y3; break;

                                } else if (shapeHandle == "bottomRight") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'bottomRight' };
                                    myState.selection[x] = shape.getCoordinates().x1
                                    myState.selection[y] = shape.getCoordinates().y1; break;

                                } else if (shapeHandle == "leftMiddle" && shape.type == 'rectangle') {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'leftMiddle' };
                                    myState.selection[x] = shape.getCoordinates().x5
                                    myState.selection[y] = shape.getCoordinates().y5; break;

                                } else if (shapeHandle == "rightMiddle" && shape.type == 'rectangle') {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'rightMiddle' };
                                    myState.selection[x] = shape.getCoordinates().x4
                                    myState.selection[y] = shape.getCoordinates().y4; break;

                                } else if (shapeHandle == "topMiddle") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'topMiddle' };
                                    myState.selection[x] = shape.getCoordinates().x7
                                    myState.selection[y] = shape.getCoordinates().y7; break;

                                } else if (shapeHandle == "bottomMiddle") {
                                    myState.selection.connectedToShape[index] = { id: shape.id, from: 'bottomMiddle' };
                                    myState.selection[x] = shape.getCoordinates().x2
                                    myState.selection[y] = shape.getCoordinates().y2; break;

                                } else if (shapeHandle == undefined) {
                                    if (myState.doing == "dragging")   // if we moved the arrow from the middle (dragging) remove both connections(left and right) 
                                        myState.selection.connectedToShape = {}
                                    myState.selection.connectedToShape[index] = {}
                                }
                            }


                        }
                    }
                } myState.valid = false; break;






            case "dragging":

                myState.selection.drag(mouse.x, mouse.y, myState.dragX, myState.dragY);

                if (myState.selection.type == 'triangle' ||
                    myState.selection.type == 'rectangle' ||
                    myState.selection.type == 'circle') { // we don't need to excute this code in other shapes

                    for (let i = 0; i < myState.shapes.length; i++) {
                        if (myState.shapes[i].type == 'arrow') {  // iterate over shapes and if shape is arrow check if arrow is connected to the current moving shape
                            let index, x, y;

                            if (myState.shapes[i].connectedToShape[0] && myState.shapes[i].connectedToShape[0].id == myState.selection.id) { // check if arrow connected from topLeft
                                index = 0,
                                    x = 'startX',
                                    y = 'startY';
                            } else if (myState.shapes[i].connectedToShape[1] && myState.shapes[i].connectedToShape[1].id == myState.selection.id) { // check if arrow connected from topRight

                                index = 1;
                                x = 'endX',
                                    y = 'endY';
                            }

                            if (myState.shapes[i].connectedToShape[index]) {
                                if (myState.selection.type == 'ellipse') {
                                    if (myState.shapes[i].connectedToShape[index].from == "leftMiddle") {
                                        myState.shapes[i][x] = myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX)
                                        myState.shapes[i][y] = myState.selection.startY;

                                    } else if (myState.shapes[i].connectedToShape[index].from == "rightMiddle") {
                                        myState.shapes[i][x] = ((myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX) + (myState.selection.startX - (myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX))) + (((myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX)) + (myState.selection.startX - (myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX))) - (myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX))))))
                                        myState.shapes[i][y] = myState.selection.startY;

                                    } else if (myState.shapes[i].connectedToShape[index].from == "topMiddle") {
                                        myState.shapes[i][x] = (myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX)) + (myState.selection.startX - (myState.selection.startX - ((myState.selection.startX + myState.selection.w) - myState.selection.startX)))
                                        myState.shapes[i][y] = myState.selection.startY - ((myState.selection.startY + myState.selection.h) - myState.selection.startY);

                                    } else if (myState.shapes[i].connectedToShape[index].from == "bottomMiddle") {
                                        myState.shapes[i][x] = myState.selection.startX
                                        myState.shapes[i][y] = myState.selection.startY + myState.selection.h;
                                    }
                                } else {
                                    if (myState.shapes[i].connectedToShape[index].from == 'topLeft') {
                                        myState.shapes[i][x] = myState.selection.startX
                                        myState.shapes[i][y] = myState.selection.startY
                                    }
                                    else if (myState.shapes[i].connectedToShape[index].from == 'topRight') {
                                        myState.shapes[i][x] = myState.selection.startX + myState.selection.w
                                        myState.shapes[i][y] = myState.selection.startY

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'bottomLeft') {
                                        myState.shapes[i][x] = myState.selection.startX
                                        myState.shapes[i][y] = myState.selection.startY + myState.selection.h

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'bottomRight') {

                                        myState.shapes[i][x] = myState.selection.startX + myState.selection.w
                                        myState.shapes[i][y] = myState.selection.startY + myState.selection.h

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'topMiddle') {
                                        myState.shapes[i][x] = (myState.selection.startX + (myState.selection.startX + myState.selection.w)) / 2
                                        myState.shapes[i][y] = myState.selection.startY

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'bottomMiddle') {
                                        myState.shapes[i][x] = (myState.selection.startX + (myState.selection.startX + myState.selection.w)) / 2
                                        myState.shapes[i][y] = myState.selection.startY + myState.selection.h

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'leftMiddle') {
                                        myState.shapes[i][x] = myState.selection.startX
                                        myState.shapes[i][y] = (myState.selection.startY + (myState.selection.startY + myState.selection.h)) / 2

                                    } else if (myState.shapes[i].connectedToShape[index].from == 'rightMiddle') {
                                        myState.shapes[i][x] = myState.selection.startX + myState.selection.w
                                        myState.shapes[i][y] = (myState.selection.startY + (myState.selection.startY + myState.selection.h)) / 2
                                    }
                                }
                            }
                        }
                    }
                } myState.valid = false; break;



            case "newShape":

                if (myState.shapeChosen != null) { // we are neither dragging nor resizing 

                    switch (myState.constructing.type) {
                        case "ellipse":
                            myState.constructing.w = Math.abs(mouse.x - myState.constructing.startX);
                            myState.constructing.h = Math.abs(mouse.y - myState.constructing.startY);
                            myState.valid = false; break;

                        case "line":
                            myState.constructing.endX = mouse.x
                            myState.constructing.endY = mouse.y;
                            myState.valid = false; break;
                        case "arrow":
                            myState.constructing.endX = mouse.x
                            myState.constructing.endY = mouse.y;
                            myState.valid = false; break;
                        case "path":
                            myState.constructing.xArray.push(mx)
                            myState.constructing.yArray.push(my)
                            myState.valid = false; break;


                        default: // other shapes

                            myState.constructing.w = mouse.x - myState.constructing.startX;
                            myState.constructing.h = mouse.y - myState.constructing.startY;
                            myState.valid = false; break;
                    }; break;
                }
        }
    }, true);

    document.addEventListener('mouseup', function (e) {
        myState.mousedown = false


        if (myState.shapeChosen) {
            let lastShape = myState.shapes[myState.shapes.length - 1]
            if (((lastShape.w === 0 || lastShape.h === 0) && (lastShape.type != "line" && lastShape.type != "arrow" && lastShape.type != 'text')) ||
                lastShape.startX == lastShape.endX && lastShape.startY == lastShape.endY) {//endX & endY are attributes for line
                if (myState.shapeChosen != "path") {

                    myState.shapes.pop();
                }

                //draw shape with a default width and height if the button is clicked
                let options = {
                    startX: mx,
                    startY: my,
                    w: 100,
                    cw: 50,
                    ch: 50,
                    h: 100,
                    endX: mx + 100,
                    endY: my + 100,
                    fillColor: '#4472c4',
                    outline: '#2f528f',
                    outlineWidth: 2,
                    arrowFeature: myState.arrowFeature
                }


                switch (myState.shapeChosen) {
                    case "triangle": myState.addShape(new Triangle(options)); break;
                    case "rect": myState.addShape(new Rectangle(options)); break;
                    case "ellipse": myState.addShape(new Ellipse(options)); break;
                    case "line": myState.addShape(new Line(options)); break;
                    case "arrow": myState.addShape(new Arrow(options)); break;
                }
            }
        }   //keep selection while editing
        if (mouseOver) myState.doing = 'editing';
        if (myState.doing != 'editing') { myState.doing = null };

        if (myState.shapeChosen != 'path')
            myState.shapeChosen = null // turn the button of after drawing unless we are drawing

        myState.valid = false;
    }, true);


    this.interval = 30;
    setInterval(function () { myState.draw(); }, myState.interval);
}

CanvasState.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
}

CanvasState.prototype.draw = function () {

    if (!this.valid) {
        let shapes = this.shapes
        this.clear();

        // draw all shapes 
        //shapes.map(shape => shape.draw(ctx))
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].toAngle != shapes[i].angle) {
                this.ctx.save();
                if (shapes[i].type == 'ellipse') {
                    this.ctx.translate(shapes[i].startX, shapes[i].startY);
                } else {

                    this.ctx.translate(shapes[i].startX + shapes[i].w / 2, shapes[i].startY + shapes[i].h / 2)
                }
                this.ctx.rotate(shapes[i].toAngle);
                shapes[i].draw(this.ctx)
                this.ctx.restore()
            } else {
                shapes[i].draw(this.ctx)
            }
        }
        //draw selection
        if (this.selection != null) {
            var mySel = this.selection
            if (this.doing != "dragging") { // if we are not dragging do not draw the borders of selection 
                if (mySel.toAngle != mySel.angle) {
                    this.ctx.save();
                    if (mySel.type == 'ellipse') {
                        this.ctx.translate(mySel.startX, mySel.startY);
                    } else {
                        this.ctx.translate(mySel.startX + mySel.w / 2, mySel.startY + mySel.h / 2);
                    }
                    this.ctx.rotate(mySel.toAngle);
                    mySel.select(this.ctx)
                    this.ctx.restore()
                } else {
                    mySel.select(this.ctx)
                }
            }
            if (mySel.type == 'arrow' && this.mousedown) {
                if (this.toBeConnected != null) {
                    this.toBeConnected.drawConnectors()
                }
            }

        }
    }

    this.valid = true
}

CanvasState.prototype.addShape = function (shape) {

    this.shapes.push(shape) // we want arrows always over all shapes UX


    this.valid = false
}

CanvasState.prototype.getMouse = function (e) {
    mx = e.clientX - canvas.getBoundingClientRect().left;
    my = e.clientY - canvas.getBoundingClientRect().top;

    return { x: mx, y: my }
}

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const s = new CanvasState(canvas);