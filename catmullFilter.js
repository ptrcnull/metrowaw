// adapted from https://gist.github.com/nicholaswmin/c2661eb11cad5671d816
// original code by Nikolas Kyriakides, licensed under MIT

/**
 * Interpolates a Catmull-Rom Spline through a series of x/y points
 * 
 * If 'alpha' is 0.5 then the 'Centripetal' variant is used
 * If 'alpha' is 1 then the 'Chordal' variant is used
 *
 * 
 * @param  {Array} data - Array of points, each point being an array with lng and lat
 * @return {Array} result - Array of points, but interpolated
 */
var catmullRomFitting = function (data,alpha = 0.5) {
    const res = []
    
    if (alpha == 0 || alpha === undefined) {
      return false;
    } else {
      var p0, p1, p2, p3, bp1, bp2, d1, d2, d3, A, B, N, M;
      var d3powA, d2powA, d3pow2A, d2pow2A, d1pow2A, d1powA;
      res.push(data[0])
      var length = data.length;
      for (var i = 0; i < length - 1; i++) {

        p0 = i == 0 ? data[0] : data[i - 1];
        p1 = data[i];
        p2 = data[i + 1];
        p3 = i + 2 < length ? data[i + 2] : p2;

        d1 = Math.sqrt(Math.pow(p0[0] - p1[0], 2) + Math.pow(p0[1] - p1[1], 2));
        d2 = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
        d3 = Math.sqrt(Math.pow(p2[0] - p3[0], 2) + Math.pow(p2[1] - p3[1], 2));

        // Catmull-Rom to Cubic Bezier conversion matrix

        // A = 2d1^2a + 3d1^a * d2^a + d3^2a
        // B = 2d3^2a + 3d3^a * d2^a + d2^2a

        // [   0             1            0          0          ]
        // [   -d2^2a /N     A/N          d1^2a /N   0          ]
        // [   0             d3^2a /M     B/M        -d2^2a /M  ]
        // [   0             0            1          0          ]

        d3powA = Math.pow(d3, alpha);
        d3pow2A = Math.pow(d3, 2 * alpha);
        d2powA = Math.pow(d2, alpha);
        d2pow2A = Math.pow(d2, 2 * alpha);
        d1powA = Math.pow(d1, alpha);
        d1pow2A = Math.pow(d1, 2 * alpha);

        A = 2 * d1pow2A + 3 * d1powA * d2powA + d2pow2A;
        B = 2 * d3pow2A + 3 * d3powA * d2powA + d2pow2A;
        N = 3 * d1powA * (d1powA + d2powA);
        if (N > 0) {
          N = 1 / N;
        }
        M = 3 * d3powA * (d3powA + d2powA);
        if (M > 0) {
          M = 1 / M;
        }

        bp1 = [
          (-d2pow2A * p0[0] + A * p1[0] + d1pow2A * p2[0]) * N,
          (-d2pow2A * p0[1] + A * p1[1] + d1pow2A * p2[1]) * N
        ]

        bp2 = [
          (d3pow2A * p1[0] + B * p2[0] - d2pow2A * p3[0]) * M,
          (d3pow2A * p1[1] + B * p2[1] - d2pow2A * p3[1]) * M
        ]

        if (bp1[0] == 0 && bp1[1] == 0) {
          bp1 = p1;
        }
        if (bp2[0] == 0 && bp2[1] == 0) {
          bp2 = p2;
        }

        for (let d = 0; d < 1; d += 0.05) {
          const cb1 = lerp(p1, bp1, d)
          const cb2 = lerp(bp1, bp2, d)
          const cb3 = lerp(bp2, p2, d)

          const qb1 = lerp(cb1, cb2, d)
          const qb2 = lerp(cb2, cb3, d)

          const p = lerp(qb1, qb2, d)
          res.push(p)
        }

        // res.push(bp1, bp2)
        res.push(p2)
      }

      return res
    }
}

function lerp(p1, p2, d) {
  const xd = p2[0] - p1[0]
  const yd = p2[1] - p1[1]
  return [
    p1[0] + xd * d,
    p1[1] + yd * d
  ]
}