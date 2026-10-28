// Subject and topic content. Add new subjects or topics here.
const SUBJECTS = [
  {
    id: 'dotnet', name: '.NET', c: '#5b3fd1', d: 'C#, ASP.NET Core and the runtime', topics: [
      { t: 'Intro to .NET', b: `<p><mark>.NET</mark> is a Microsoft platform for building web, desktop, mobile, cloud and console apps with C#, F# or VB.NET.</p><ul><li><b>Features:</b> multi-language, managed memory, rich class library, security, cross-platform (.NET Core and later).</li><li><b>Advantages:</b> faster development, strong tooling (Visual Studio), interoperability, scalability.</li></ul>` },
      { t: '.NET Architecture', b: `<ul><li><mark>CLR</mark>: runtime that JIT-compiles IL, manages memory (GC), threads and security.</li><li><mark>CTS</mark>: Common Type System, defines how types are declared and used.</li><li><mark>CLS</mark>: Common Language Specification, the rules languages follow to interoperate.</li><li><mark>FCL</mark>: Framework Class Library, reusable classes (System.IO, System.Collections, System.Data).</li></ul><p>Flow: source code, compiler, IL + metadata (assembly), CLR JIT, machine code.</p>` },
      {
        t: 'C# Fundamentals', b: `<ul><li><b>Types:</b> int, double, bool, char, string, decimal.</li><li><b>Operators:</b> arithmetic, relational, logical, assignment, ternary <code>?:</code>.</li><li><b>Control:</b> if/else, switch, for, while, do-while, foreach, break, continue.</li></ul><pre>int age = 20;
string s = age &gt;= 18 ? "Adult" : "Minor";
for (int i = 0; i &lt; 3; i++) Console.WriteLine(i);</pre>`},
      {
        t: 'OOP in C#', b: `<ul><li><mark>Class</mark> is the blueprint, <mark>object</mark> is an instance.</li><li><b>Encapsulation:</b> private fields, public properties.</li><li><b>Inheritance:</b> reuse via <code>class B : A</code>.</li><li><b>Polymorphism:</b> overloading (compile time), overriding with <code>virtual/override</code> (runtime).</li><li><b>Abstraction:</b> abstract classes and interfaces.</li></ul><pre>abstract class Shape { public abstract double Area(); }
class Sq : Shape { public double S;
  public override double Area() =&gt; S * S; }</pre>`},
      {
        t: 'Methods in C#', b: `<ul><li><b>Overloading:</b> same name, different parameters.</li><li><b>Optional args:</b> <code>void Hi(string n = "All")</code>.</li><li><b>params:</b> variable argument count.</li><li><b>Constructors:</b> run on object creation; can be overloaded, chained with <code>this(...)</code>.</li></ul><pre>int Sum(params int[] n) =&gt; n.Sum();
class P { public P(string name) { Name = name; }
  public string Name; }</pre>`},
      {
        t: 'Arrays and Strings', b: `<pre>int[] a = {1,2,3};          // 1-D
int[,] m = new int[2,3];     // 2-D rectangular
int[][] j = new int[2][];    // jagged</pre><ul><li>Strings are <mark>immutable</mark>. Methods: Length, Substring, IndexOf, Replace, Split, ToUpper, Trim, Contains.</li><li>Use <mark>StringBuilder</mark> for many modifications: <code>sb.Append("x").Insert(0,"y")</code>.</li></ul>`},
      {
        t: 'Exception Handling', b: `<pre>try { int x = int.Parse(s); }
catch (FormatException e) { Console.WriteLine(e.Message); }
finally { Console.WriteLine("always runs"); }

class AgeException : Exception {
  public AgeException(string m) : base(m) {} }
throw new AgeException("Invalid age");</pre><ul><li><code>finally</code> runs whether or not an exception occurs.</li><li>Catch specific exceptions before general <code>Exception</code>.</li></ul>`},
      {
        t: 'Delegates and Events', b: `<p>A <mark>delegate</mark> is a type-safe reference to a method.</p><pre>delegate void Notify(string m);
Notify n = Show;  n += Log;   // multicast
n("hi");                       // calls both

class Btn { public event Notify Clicked;
  public void Click() =&gt; Clicked?.Invoke("clicked"); }</pre><ul><li>Events use delegates; subscribers use <code>+=</code>, <code>-=</code>.</li><li>Built-ins: <code>Action</code>, <code>Func</code>, <code>EventHandler</code>.</li></ul>`},
      {
        t: 'Collections and Generics', b: `<ul><li><b>ArrayList</b>: non-generic, stores object (boxing).</li><li><b>List&lt;T&gt;</b>: type-safe dynamic array.</li><li><b>Dictionary&lt;K,V&gt;</b>: key-value pairs, fast lookup.</li><li><b>Stack&lt;T&gt;</b> (LIFO): Push, Pop, Peek.</li><li><b>Queue&lt;T&gt;</b> (FIFO): Enqueue, Dequeue.</li></ul><p><mark>Generics</mark> give type safety and reuse without boxing.</p><pre>var d = new Dictionary&lt;int,string&gt;();
d[1] = "one";</pre>`},
      {
        t: 'ADO.NET and Databases', b: `<pre>using var con = new SqlConnection(cs);
con.Open();
var cmd = new SqlCommand("SELECT Name FROM Students WHERE Id=@id", con);
cmd.Parameters.AddWithValue("@id", 1);
using var r = cmd.ExecuteReader();
while (r.Read()) Console.WriteLine(r["Name"]);</pre><ul><li><b>SqlConnection</b> opens the link, <b>SqlCommand</b> runs SQL, <b>SqlDataReader</b> reads rows forward-only.</li><li>Always use <mark>parameters</mark> to stop SQL injection.</li><li>ExecuteNonQuery for insert/update/delete, ExecuteScalar for one value.</li></ul>`}]
  },
  {
    id: 'mern', name: 'MERN', c: '#0f8a5f', d: 'MongoDB, Express, React, Node (backend)', topics: [
      { t: 'Node.js Fundamentals', b: `<p><mark>Node.js</mark> runs JavaScript on the server using Chrome's V8 engine.</p><ul><li><b>Modules:</b> CommonJS <code>require</code> or ES <code>import</code>; built-ins like fs, path, http.</li><li><b>npm:</b> package manager; <code>package.json</code> lists dependencies.</li><li><b>Event loop:</b> single thread handles async I/O via callbacks, promises and the libuv thread pool, so it never blocks on I/O.</li></ul>` },
      {
        t: 'Express.js Framework', b: `<pre>const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req,res) =&gt; res.send('Hello'));
app.listen(5000);</pre><ul><li>Routing maps method + path to a handler.</li><li><code>req.params</code>, <code>req.query</code>, <code>req.body</code> carry input; <code>res.json()</code>, <code>res.status()</code> send output.</li></ul>`},
      { t: 'REST API Development', b: `<ul><li><code>GET</code> read, <code>POST</code> create, <code>PUT</code> replace, <code>PATCH</code> partial update, <code>DELETE</code> remove.</li><li>Principles: stateless, resource-based URLs (<code>/api/users/5</code>), uniform interface, JSON, correct status codes, versioning (<code>/api/v1</code>).</li></ul>` },
      {
        t: 'MongoDB Database', b: `<p>MongoDB is a NoSQL database storing <mark>documents</mark> (JSON/BSON) in <mark>collections</mark>.</p><pre>db.users.insertOne({name:"Asha", age:21})
db.users.find({age:{$gt:18}})
db.users.updateOne({name:"Asha"},{$set:{age:22}})
db.users.deleteOne({name:"Asha"})</pre><ul><li>Connect with a URI such as <code>mongodb://localhost:27017/mydb</code> or Atlas.</li></ul>`},
      {
        t: 'Mongoose', b: `<pre>const userSchema = new mongoose.Schema({
  name:  { type:String, required:true },
  email: { type:String, unique:true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }]
});
const User = mongoose.model('User', userSchema);</pre><ul><li>Schemas define shape and <mark>validation</mark> (required, min, max, match).</li><li>Relationships use <code>ref</code> + <code>populate()</code>.</li></ul>`},
      {
        t: 'Authentication & Authorization', b: `<ol><li>Register: hash password with <mark>bcrypt</mark>, save user.</li><li>Login: compare hash, issue a <mark>JWT</mark>.</li><li>Client sends <code>Authorization: Bearer token</code>.</li><li>Middleware verifies the token and checks <b>role</b> (admin/user).</li></ol><pre>const token = jwt.sign({id,role}, process.env.JWT_SECRET, {expiresIn:'1d'});
const isAdmin = (req,res,next) =&gt;
  req.user.role==='admin' ? next() : res.sendStatus(403);</pre>`},
      {
        t: 'Middleware & Error Handling', b: `<p>Middleware is a function <code>(req,res,next)</code> that runs in order between request and response.</p><pre>app.use((req,res,next)=&gt;{ console.log(req.method,req.url); next(); });
// centralized error handler (4 args, placed last)
app.use((err,req,res,next)=&gt;
  res.status(err.status||500).json({message:err.message}));</pre><ul><li>Validate input with express-validator or Joi.</li></ul>`},
      {
        t: 'CRUD Operations', b: `<pre>router.post('/', async (req,res)=&gt; res.status(201).json(await Note.create(req.body)));
router.get('/', async (req,res)=&gt; res.json(await Note.find()));
router.put('/:id', async (req,res)=&gt;
  res.json(await Note.findByIdAndUpdate(req.params.id, req.body, {new:true})));
router.delete('/:id', async (req,res)=&gt;
  { await Note.findByIdAndDelete(req.params.id); res.sendStatus(204); });</pre>`},
      { t: 'API Testing', b: `<ul><li><mark>Postman</mark>: choose method, set URL, add JSON body and headers, send, inspect response.</li><li>Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.</li><li>Test success and failure cases; save requests in collections.</li></ul>` },
      { t: 'Backend Security & Deployment', b: `<ul><li><b>.env</b> files for secrets (dotenv); never commit them.</li><li><b>CORS</b> (cors package) limits which origins can call the API.</li><li><b>Helmet</b> sets secure HTTP headers.</li><li><b>Rate limiting</b> (express-rate-limit) blocks abuse and brute force.</li><li><b>Deploy:</b> Render, Railway or a VPS; set env vars, use MongoDB Atlas, run with PM2.</li></ul>` }]
  },
  {
    id: 'dm', name: 'Data Mining', c: '#c2681a', d: 'Finding patterns in large datasets', topics: [
      { t: 'Intro to Data Mining', b: `<p>Data mining is extracting <mark>useful, previously unknown patterns</mark> from large datasets.</p><ul><li><b>Objectives:</b> discover patterns, predict outcomes, support decisions.</li><li><b>Applications:</b> retail basket analysis, fraud detection, healthcare, CRM, weather.</li><li><b>Importance:</b> data is growing faster than humans can analyse it manually.</li></ul>` },
      { t: 'Data Mining Functionalities', b: `<ul><li><b>Characterization:</b> summarizes a target class.</li><li><b>Discrimination:</b> compares target and contrasting classes.</li><li><b>Association:</b> items that occur together.</li><li><b>Classification:</b> assign items to known classes.</li><li><b>Clustering:</b> group similar items, no labels.</li><li><b>Outlier analysis:</b> find rare, abnormal records.</li></ul>` },
      { t: 'Data Preprocessing', b: `<ul><li><mark>Cleaning:</mark> handle missing values, noise, outliers.</li><li><mark>Integration:</mark> merge sources, resolve redundancy and conflicts.</li><li><mark>Transformation:</mark> normalization, smoothing, aggregation, discretization.</li><li><mark>Reduction:</mark> dimensionality reduction (PCA), sampling, compression.</li></ul><pre>min-max: x' = (x - min)/(max - min)</pre>` },
      { t: 'Data Warehouse & OLAP', b: `<p>A <mark>data warehouse</mark> is subject-oriented, integrated, time-variant and non-volatile storage for decision support.</p><ul><li><b>Models:</b> star schema, snowflake schema, fact constellation; data cube with facts and dimensions.</li><li><b>OLAP operations:</b> roll-up, drill-down, slice, dice, pivot.</li></ul>` },
      { t: 'Data Warehouse Architecture', b: `<ul><li><b>Bottom tier:</b> warehouse database fed by ETL (extract, transform, load).</li><li><b>Middle tier:</b> OLAP server (ROLAP, MOLAP, HOLAP).</li><li><b>Top tier:</b> front-end tools for query, reports, mining.</li><li><mark>Data mart:</mark> small warehouse for one department.</li><li><mark>Metadata:</mark> data about data (schema, sources, mappings).</li></ul>` },
      { t: 'Classification & Prediction', b: `<ul><li><b>Decision tree:</b> splits by information gain (ID3), gain ratio (C4.5) or Gini (CART).</li><li><b>Naive Bayes:</b> uses <code>P(C|X) = P(X|C)P(C)/P(X)</code> assuming independent attributes.</li><li><b>Prediction:</b> estimates continuous values, e.g. regression.</li><li>Evaluate with accuracy, precision, recall, F1.</li></ul>` },
      { t: 'Association Rule Mining', b: `<ul><li><mark>Support</mark> = count(A and B) / total.</li><li><mark>Confidence</mark> = support(A and B) / support(A).</li><li><b>Apriori:</b> any subset of a frequent itemset must be frequent. Generate candidates, prune below minimum support, repeat.</li></ul><p>Rule example: <code>{milk, bread} → {butter}</code>.</p>` },
      { t: 'Cluster Analysis', b: `<ul><li><b>K-means:</b> pick k centroids, assign points, recompute means, repeat.</li><li><b>Hierarchical:</b> agglomerative (merge) or divisive (split); shown as a dendrogram.</li><li><b>DBSCAN:</b> density-based using eps and minPts; finds arbitrary shapes and marks noise.</li></ul>` },
      { t: 'Generalization & Concept Hierarchy', b: `<p><mark>Attribute-Oriented Induction (AOI)</mark> generalizes data by replacing low-level values with higher-level concepts.</p><ul><li><b>Concept hierarchy:</b> city, state, country.</li><li>Steps: collect task-relevant data, generalize attributes, merge identical tuples and sum counts, present as tables or charts.</li><li>Gives compact data summarization.</li></ul>` },
      { t: 'Major Issues in Data Mining', b: `<ul><li><b>Data quality:</b> incomplete, noisy, inconsistent data.</li><li><b>Scalability:</b> algorithms must handle huge datasets efficiently.</li><li><b>Privacy and security:</b> protecting personal data from misuse.</li><li><b>Large/high-dimensional data:</b> use parallel and distributed methods, sampling.</li><li>Also: mixed data types, interpretability, integrating background knowledge.</li></ul>` }]
  },
  {
    id: 'cyber', name: 'Cybersecurity', c: '#c2312d', d: 'Threats, defenses and secure practice', topics: [
      { t: 'Intro to Cyber Security', b: `<p>Protecting systems, networks and data from digital attacks.</p><ul><li><b>Objectives (CIA):</b> <mark>Confidentiality, Integrity, Availability</mark>.</li><li><b>Threats:</b> malware, phishing, DoS, insider threats, data breaches, social engineering.</li></ul>` },
      { t: 'Network Security', b: `<ul><li><mark>Firewall:</mark> filters traffic by rules (packet, stateful, application).</li><li><mark>VPN:</mark> encrypted tunnel (IPsec, SSL VPN).</li><li><b>Protocols:</b> HTTPS/TLS, SSH, IPsec secure; plain FTP and Telnet are not.</li><li><mark>IDS</mark> detects (signature or anomaly based); IPS also blocks.</li></ul>` },
      { t: 'Cryptography', b: `<ul><li><b>Encryption</b> turns plaintext into ciphertext; <b>decryption</b> reverses it.</li><li><b>Symmetric:</b> one shared key (AES).</li><li><b>Asymmetric:</b> public/private pair (RSA).</li><li><b>Hashing:</b> one-way digest (SHA-256) for integrity.</li></ul>` },
      { t: 'Ethical Hacking', b: `<p>Authorized testing of systems to find weaknesses before attackers do.</p><ol><li>Reconnaissance</li><li>Scanning</li><li>Gaining access</li><li>Maintaining access</li><li>Covering tracks and reporting</li></ol><ul><li><b>Vulnerability assessment</b> lists weaknesses; <b>penetration testing</b> actively exploits them with permission.</li></ul>` },
      { t: 'Malware & Cyber Attacks', b: `<ul><li><b>Virus:</b> attaches to files, needs a host.</li><li><b>Worm:</b> self-spreads over networks.</li><li><b>Trojan:</b> disguised as legitimate software.</li><li><b>Ransomware:</b> encrypts data for payment.</li><li><b>Spyware:</b> secretly collects information.</li><li><b>Phishing:</b> fake messages steal credentials.</li></ul>` },
      { t: 'Web Application Security', b: `<ul><li><mark>SQL injection:</mark> use parameterized queries.</li><li><mark>XSS:</mark> encode output, use CSP.</li><li><mark>CSRF:</mark> anti-CSRF tokens, SameSite cookies.</li></ul><p><b>OWASP Top 10</b> includes broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable components, authentication failures.</p>` },
      { t: 'Authentication & Access Control', b: `<ul><li>Strong passwords, salted hashing, no reuse.</li><li><mark>MFA:</mark> combine something you know, have, are.</li><li><mark>RBAC:</mark> permissions attached to roles, users get roles.</li><li>Principle of <b>least privilege</b>.</li></ul>` },
      { t: 'Digital Forensics', b: `<ol><li><b>Identify</b> evidence sources.</li><li><b>Collect</b> using write blockers; make bit-by-bit images.</li><li><b>Preserve</b> with hashes and a <mark>chain of custody</mark>.</li><li><b>Analyze</b> logs, files, memory, network traffic.</li><li><b>Report</b> findings.</li></ol>` },
      { t: 'Cloud Security', b: `<ul><li><b>Data protection:</b> encrypt at rest and in transit.</li><li><b>IAM:</b> identity management, MFA, SSO.</li><li><b>Permissions:</b> least privilege policies.</li><li><b>Vulnerabilities:</b> misconfigured storage, weak keys, insecure APIs, account hijacking.</li><li>Shared responsibility: provider secures the cloud, you secure what you put in it.</li></ul>` },
      { t: 'Incident Response & Risk', b: `<ul><li><b>Incident response:</b> Preparation, Detection, Containment, Eradication, Recovery, Lessons learned.</li><li><b>Risk assessment:</b> identify assets, threats and vulnerabilities; <code>Risk = Likelihood x Impact</code>; then mitigate, transfer, accept or avoid.</li><li><b>Disaster recovery:</b> backups, RTO and RPO targets, tested recovery plan.</li></ul>` }]
  },
  {
    id: 'crypto', name: 'Cryptography', c: '#0a7ea4', d: 'Ciphers, hashes and key exchange', topics: [
      { t: 'Intro to Cryptography', b: `<p>The science of securing information using mathematics.</p><ul><li><b>Objectives:</b> confidentiality, integrity, authentication, non-repudiation.</li><li><b>Applications:</b> HTTPS, banking, messaging, digital signatures, passwords, blockchain.</li></ul>` },
      { t: 'Basic Concepts', b: `<ul><li><b>Plaintext:</b> original readable message.</li><li><b>Ciphertext:</b> encrypted output.</li><li><b>Encryption / decryption:</b> plaintext to ciphertext and back.</li><li><b>Cipher:</b> the algorithm.</li><li><b>Key:</b> secret value controlling the cipher.</li></ul><pre>C = E(K, P)     P = D(K, C)</pre>` },
      { t: 'Classical Encryption', b: `<ul><li><b>Caesar:</b> shift by k, <code>C = (P + k) mod 26</code>.</li><li><b>Monoalphabetic:</b> each letter maps to one fixed substitute; broken by frequency analysis.</li><li><b>Playfair:</b> encrypts digraphs using a 5x5 key square.</li><li><b>Vigenere:</b> polyalphabetic, keyword shifts repeat.</li></ul><pre>Caesar k=3: HELLO -&gt; KHOOR</pre>` },
      { t: 'Symmetric Key Cryptography', b: `<p>The <mark>same key</mark> encrypts and decrypts.</p><ul><li><b>DES:</b> 64-bit block, 56-bit key, 16 Feistel rounds; now weak.</li><li><b>3DES:</b> DES applied three times, 112 or 168-bit effective key.</li><li><b>AES:</b> 128-bit block, 128/192/256-bit key, 10/12/14 rounds; current standard.</li></ul><p>Challenge: sharing the key securely.</p>` },
      {
        t: 'Asymmetric Key Cryptography', b: `<p>A <mark>public key</mark> encrypts; the matching <mark>private key</mark> decrypts.</p><pre>RSA: n = p*q,  phi = (p-1)(q-1)
choose e, d with e*d = 1 mod phi
encrypt: c = m^e mod n
decrypt: m = c^d mod n</pre><ul><li>Security rests on the difficulty of factoring n.</li><li>Key exchange: Diffie-Hellman.</li></ul>`},
      { t: 'Hash Functions', b: `<ul><li><b>MD5:</b> 128-bit, broken.</li><li><b>SHA-1:</b> 160-bit, deprecated.</li><li><b>SHA-256:</b> 256-bit, widely used.</li></ul><p>Secure hash properties: <mark>pre-image resistance, second pre-image resistance, collision resistance</mark>, fixed output size, avalanche effect.</p>` },
      { t: 'Digital Signatures', b: `<ol><li>Hash the message.</li><li>Sign the hash with the sender's <b>private key</b>.</li><li>Receiver verifies with the sender's <b>public key</b> and compares hashes.</li></ol><p>Provides <mark>authenticity, integrity and non-repudiation</mark>. Examples: RSA, DSA, ECDSA.</p>` },
      { t: 'Message Authentication (MAC)', b: `<p>A MAC is a short tag from a message and a <mark>shared secret key</mark>, proving integrity and origin.</p><pre>HMAC(K, m) = H((K xor opad) || H((K xor ipad) || m))</pre><ul><li>Receiver recomputes the tag and compares.</li><li>Unlike signatures, MACs give no non-repudiation.</li></ul>` },
      { t: 'Key Management & Distribution', b: `<ul><li><b>Generation:</b> use a cryptographically secure random source.</li><li><b>Storage:</b> HSMs, key vaults, never hard-code.</li><li><b>Exchange:</b> Diffie-Hellman or encrypt the key with a public key.</li><li><b>Distribution:</b> key distribution centers (Kerberos) or PKI.</li><li>Rotate and revoke keys regularly.</li></ul>` },
      { t: 'PKI & Digital Certificates', b: `<p><mark>PKI</mark> binds public keys to identities.</p><ul><li><b>Certificate (X.509)</b> holds subject, public key, issuer, validity, signature.</li><li><b>CA:</b> trusted authority that signs certificates; chain leads to a root CA.</li><li><b>SSL/TLS certificates</b> let browsers authenticate servers.</li><li><b>Trust management:</b> root stores, revocation (CRL, OCSP), expiry.</li></ul>` }]
  }
];
