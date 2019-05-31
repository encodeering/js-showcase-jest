describe ('derivation showcase', () => {

    // 1

    let a; // shared partially
    let b; // shared

    beforeEach (() => {
        a = 'artifact'
        b = 42;
    });

    describe ('with nested tests', () => {

        let d; // shared

        beforeEach (() => {
            d = new Date (b); // mutable state needs to be reset
        });

        it ('uses state from different before handlers', () => {
            expect (b).toEqual (42); // 1st block
            expect (d).toEqual (new Date (42)); // 2nd block
        });



        // 2
        //            A    B      C     D  E
        const setup = f => async ( ) => f ({ a: 'artifact', b: 84, get d () { return new Date (this.b); }});  // no shareable declarations, mutable state is recreated on every call

        it ('shows state from a setup factory', setup (({ b, d }) => { // okay, a is not used in this test!
            expect (b).toEqual (84);
            expect (d).toEqual (new Date (84));
        }));

    });

});
