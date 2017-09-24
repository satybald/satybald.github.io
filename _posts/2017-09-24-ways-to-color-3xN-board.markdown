---
layout: post
title:  "Ways to color a 3xN Board"
date:   2017-09-24 09:00:00
comments: true
categories: dynamic programming
---

Problem
-------

Given a 3Xn board, find the number of ways to color it using at most 4 colors such that no two adjacent boxes have the same color. Diagonal neighbors are not treated as adjacent boxes. Output the ways%1000000007 as the answer grows quickly.


Example:
--------

Input: n = 1
Output: 36    


Solution:
---------

Let's first think how many of ways there's exists valid colors when `n = 1`. For convenience, let's encode our colors as numbers from 0 to 3. We can use 3 unique colors to form a board. It's `3!` factorial times the number of  ways we can choose 3 colors out of 4 i.e. `C(4, 3)`. Then it's possible to make a board with only using 2 colors. The number of ways is 2: `{1, 0, 1} or {0, 1, 0}`. There's exists `C(4, 2)` of possible combinations of this pairs. Overall, we have: `3! x C(4, 3) + 2 x C(4, 2) = 36`.

Once we get a grasp of the trivial case, it's a time to solve it for a general case. For this, we will use a technique called [dynamic programming][db].

Let's say we are able to solve the problem for the i column, which ends with some triple `<a_i, b_i, c_i>`. When we need to to solve for the next column j = i + 1, we need to consider such triples, `Triplet<a_j, b_j, c_j>` such that a`j != b`j, b`j != c`j, and previous column elements does not match: `a_i != a_j and b_i != b_j, and c_i != c_j`. Answer for the `Triple(j) = sum(ValidTriplets(i) + 1)`.

Below is an implementation of the given approach. Please note as we need only values from the previous iterations, we can only store only it and save a lot of space. 

For convenience, I used HashMap to store results and not to bother with static 3D arrays. As usual, all suggestions and recommendations welcome!

{% highlight java %}

public class NBox
{
    public static class Triplet
    {
        int a, b, c;

        @Override
        public boolean equals(Object o)
        {
            if (this == o) {
                return true;
            }
            if (!(o instanceof Triplet)) {
                return false;
            }

            Triplet triplet = (Triplet) o;

            if (a != triplet.a || b != triplet.b) {
                return false;
            }
            return c == triplet.c;
        }

        @Override
        public int hashCode()
        {
            int result = a;
            result = 31 * result + b;
            result = 31 * result + c;
            return result;
        }

        public Triplet(int a, int b, int c)
        {

            this.a = a;
            this.b = b;
            this.c = c;
        }

        public boolean isValid(Triplet other) {
            return other.a != a && b != other.b && c != other.c;
        }

        @Override
        public String toString()
        {
            return "{" + "a=" + a + ", b=" + b + ", c=" + c + '}';
        }

        public static List<Triplet> generateAllValidSingleTriple() {
            List<Triplet> ans = new ArrayList<>();
            for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) {
                    if(i != j) {
                        for (int k = 0; k < 4; k++) {
                            if(k != j) {
                                ans.add(new Triplet(i, j, k));
                            }
                        }
                    }
                }
            }
            return ans;
        }
    }

    public static int solve(int n) {
        Map<Triplet, Integer>[] box = new HashMap[2];
        for (int i = 0; i <= 1; i++) {
            box[i] = new HashMap<>();
        }
        List<Triplet> all = Triplet.generateAllValidSingleTriple();
        int j = 0;
        for (int i = 1; i <= n; i++) {
            if(i == 1) {
                for (Triplet triplet : all) {
                    box[j].put(triplet, 1);
                }
            } else {
                j = (j + 1) % 2;
                for (Triplet current : all) {
                    int sum = 0;
                    for (Triplet prev : all) {
                        if(current.isValid(prev)) {
                            sum = (sum + box[(j + 1) % 2].get(prev)) % 1000000007;

                        }
                    }
                    box[j].put(current, sum);
                }
            }
        }
        int sum = 0;
        for (Integer trp : box[(n +1) % 2].values()) {
            sum = (sum + trp) % 1000000007;
        }
        return sum;
    }
{% endhighlight %}


[dp]: https://en.wikipedia.org/wiki/Dynamic`programming
