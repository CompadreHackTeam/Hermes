


var width = 960,
    height = 500;

var nodes = d3.range(5).map(function(i) {
    return {
        type: Math.random() * 5 | 0,
        radius: 30,
        fixed: true,
        type: i,
        x: (i + 1) * (width / 6),
        y: height / 2
    };
});

var color = d3.scale.category10();

var force = d3.layout.force()
    .gravity(0)
    .charge(0)
    .nodes(nodes)
    .size([width, height])
    .on("tick", ticked);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", mousemoved);

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", function(d) { return d.radius - 2; })
    .style("fill", function(d) { return color(d.type); });

var p0;

force.start();

function mousemoved() {
    var p1 = d3.mouse(this);
    p0 = p1;

    var node = {
        radius: Math.random() * 12 + 4,
        type: Math.random() * 5 | 0,
        x: p1[0],
        y: p1[1],
        px: (p0 || (p0 = p1))[0],
        py: p0[1]
    };

    svg.append("circle")
        .data([node])
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.radius - 2; })
        .style("fill", function(d) { return color(d.type); })
        .transition()
        .delay(3000)
        .attr("r", 1e-6)
        .each("end", function() { nodes.splice(6, 1); })
        .remove();

    nodes.push(node);
    force.resume();
}

function ticked(e) {
    var q = d3.geom.quadtree(nodes),
        k = e.alpha * 0.1,
        i = 0,
        n = nodes.length,
        o;

    while (++i < n) {
        o = nodes[i];
        if (o.fixed) continue;
        c = nodes[o.type];
        o.x += (c.x - o.x) * k;
        o.y += (c.y - o.y) * k;
        q.visit(collide(o));
    }

    svg.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = node.radius + quad.point.radius;
            if (l < r) {
                l = (l - r) / l * .5;
                node.px += x * l;
                node.py += y * l;
            }
        }
        return x1 > nx2
            || x2 < nx1
            || y1 > ny2
            || y2 < ny1;
    };
}