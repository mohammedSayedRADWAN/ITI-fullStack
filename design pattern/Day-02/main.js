//base class
class Teache{
    constructor(name){
        this.name = name;
        
    }

    describe(){
        return `Teacher: ${this.name}`;
    }
}

//teacher decorator to chain from one to another
class TeacherDecorator extends Teache {
    constructor(teacher) {
        super();
        this.teacher = teacher;
    }

    describe() {
        return this.teacher.describe();
    }
}

class SalaryDecorator extends TeacherDecorator {
    constructor(teacher,salary) {
        super(teacher);
        this.salary = salary;
    }
    describe() {        return `${super.describe()} with a salary of ${this.salary}`;
    }
}

let teacher = new Teache("John Doe");
let teacherWithSalary = new SalaryDecorator(teacher, "$5000");
console.log(teacherWithSalary.describe());




//---proxy pattern

class CountryAPI {
    fetchCountries() {
        console.log("--- Connecting to External API (Slow Operation) ---");
        // Simulating a list coming from a server
        return ["Egypt", "Saudi Arabia", "United Arab Emirates", "Jordan"];
    }
}
class ProxyCountryAPI {
    constructor() {
        this.realApi = new CountryAPI();
        this.cache = null; // This is where we store the data once we get it
    }

    getCountries() {
        // Step 1: Check if we already have the data in the cache
        if (this.cache === null) {
            console.log("Cache is empty.");
            // Step 2: If not in cache, call the real expensive API
            this.cache = this.realApi.fetchCountries();
        } else {
            // Step 3: If it's in cache, return it immediately
            console.log("--- Returning Data from Cache (Fast Operation) ---");
        }

        return this.cache;
    }
}
const apiProxy = new ProxyCountryAPI();

// First Request: Cache is empty, will hit the real API
console.log("Request 1:", apiProxy.getCountries());
console.log("------------------------------------");
// Second Request: Cache has data, will NOT hit the real API
console.log("Request 2:", apiProxy.getCountries());

// Device 1: TV (Supports all functions)
class TV {
    increase_volume() {
        console.log("TV: Volume is now higher.");
    }
    decrease_volume() {
        console.log("TV: Volume is now lower.");
    }
    mute() {
        console.log("TV: Sound is now muted.");
    }
}

// Device 2: Speaker (Does NOT support mute)
class Speaker {
    increase_volume() {
        console.log("Speaker: Volume +1");
    }
    decrease_volume() {
        console.log("Speaker: Volume -1");
    }
}

class RemoteControl {
    constructor(device) {
        this.device = device; // This is the "Bridge" to the device
    }

    volumeUp() {
        this.device.increase_volume();
    }

    volumeDown() {
        this.device.decrease_volume();
    }
}

// Advanced Remote that adds the Mute feature
class AdvancedRemote extends RemoteControl {
    muteDevice() {
        if (this.device.mute) {
            this.device.mute();
        } else {
            console.log("Warning: This device does not support Mute functionality.");
        }
    }
}


// Case 1: Using a TV with an Advanced Remote
const myTV = new TV();
const tvRemote = new AdvancedRemote(myTV);
tvRemote.volumeUp();   // TV: Volume is now higher.
tvRemote.muteDevice(); // TV: Sound is now muted.

console.log("-------------------");

// Case 2: Using a Speaker with an Advanced Remote
const mySpeaker = new Speaker();
const speakerRemote = new AdvancedRemote(mySpeaker);
speakerRemote.volumeUp();   // Speaker: Volume +1
speakerRemote.muteDevice(); // Warning: This device does not support Mute functionality.


// task 4
//composite pattern

// 1. The Component (Interface)
// This ensures both Book and Box have the same method names.
class CatalogItem {
    showPages() {
        throw new Error("Method 'showPages()' must be implemented.");
    }
    display(indent) {
        throw new Error("Method 'display()' must be implemented.");
    }
}

// 2. The Leaf (Individual Object)
// Represents a single book.
class Book extends CatalogItem {
    constructor(title, pages) {
        super();
        this.title = title;
        this.pages = pages;
    }

    showPages() {
        return this.pages;
    }

    display(indent = "") {
        console.log(`${indent}📖 Book: ${this.title} (${this.pages} pages)`);
    }
}

// 3. The Composite (Container Object)
// Represents a box that can contain books or other boxes.
class Box extends CatalogItem {
    constructor(name) {
        super();
        this.name = name;
        this.children = []; // Store both Books and Boxes
    }

    add(item) {
        this.children.push(item);
    }

    // This is the core of the pattern: Recursive calculation
    showPages() {
        return this.children.reduce((total, child) => total + child.showPages(), 0);
    }

    // Recursive display to show the hierarchy
    display(indent = "") {
        console.log(`${indent}📦 Box: ${this.name}`);
        this.children.forEach(child => child.display(indent + "  "));
    }
}

// 4. Client Code (Implementation)
try {
    // Creating individual books
    const book1 = new Book("JavaScript Design Patterns", 250);
    const book2 = new Book("Clean Code", 400);
    const book3 = new Book("The Pragmatic Programmer", 350);

    // Creating a small box and adding books to it
    const techBox = new Box("Technical Books");
    techBox.add(book1);
    techBox.add(book2);

    // Creating a main box (The Root)
    const mainStoreBox = new Box("Main University Store");
    mainStoreBox.add(techBox); // Adding a box inside a box
    mainStoreBox.add(book3);   // Adding a book directly to the main box

    // Show the hierarchy (Requirement from the screenshot)
    console.log("--- Store Hierarchy ---");
    mainStoreBox.display();

    // Show the total pages (Requirement from the screenshot)
    console.log("\n--- Page Count Calculation ---");
    console.log(`Total pages in [${mainStoreBox.name}]: ${mainStoreBox.showPages()} pages`);

} catch (error) {
    console.error(error.message);
}


// task 5
//facade pattern

// 1. الأنظمة المعقدة (اللي العميل مش عايز يشغل باله بيها)
class Kitchen {
    cookFood() { console.log("Kitchen: Cooking the meal..."); }
}

class Cashier {
    takePayment() { console.log("Cashier: Processing payment..."); }
}

class Delivery {
    shipOrder() { console.log("Delivery: Delivering the meal to your door!"); }
}

// 2. الـ Facade (موظف الكول سنتر)
// ده الكلاس اللي بيبسط الدنيا للعميل
class RestaurantFacade {
    constructor() {
        this.kitchen = new Kitchen();
        this.cashier = new Cashier();
        this.delivery = new Delivery();
    }

    // ميثود واحدة بتعمل كل الخطوات في خطوة واحدة
    orderMeal() {
        console.log("--- Order started ---");
        this.cashier.takePayment();
        this.kitchen.cookFood();
        this.delivery.shipOrder();
        console.log("--- Order completed! Enjoy your meal ---");
    }
}

// 3. العميل (Client)
const myApp = new RestaurantFacade();

// العميل بينادي وظيفة واحدة بس وبسيطة
myApp.orderMeal();




// task 6
// الحالة الأولى: قيد التنفيذ
class InProgressState {
    handle(task) {
        console.log("Task is IN PROGRESS: You can edit or add notes.");
    }
}

// الحالة الثانية: جاهزة للمراجعة
class ReadyForReviewState {
    handle(task) {
        console.log("Task is READY FOR REVIEW: Waiting for manager approval (Locked for editing).");
    }
}

// الحالة الثالثة: منتهية
class DoneState {
    handle(task) {
        console.log("Task is DONE: Task is archived and cannot be changed.");
    }
}

class Task {
    constructor(title) {
        this.title = title;
        // بنبدأ دايماً بحالة InProgress
        this.state = new InProgressState(); 
    }

    // ميثود لتغيير الحالة
    setState(newState) {
        this.state = newState;
    }

    // الميثود اللي سلوكها بيتغير حسب الحالة
    showStatus() {
        console.log(`--- Status for [${this.title}] ---`);
        this.state.handle(this);
    }
}

