const Privacy = () => {
	return (
		<div className="text-left mx-auto max-w-prose pb-18 text-lg">
			<h1 className="text-2xl font-bold pt-36">
				AccentMe Privacy Policy
			</h1>
			<p>Last Updated: [August 7, 2025]</p>
			<p>
				Your privacy is important to us. This policy outlines how
				AccentMe collects, uses, and protects your data.
			</p>
			<ol className="list-decimal pl-6 space-y-4 mt-4 marker:font-bold">
				<li>
					<h2 className="text-xl font-semibold">
						Information We Collect
					</h2>
					<p>
						We collect the following information when you use the
						service:
					</p>
					<ul className="list-disc pl-6">
						<li>Audio recordings you upload</li>
						<li>
							Metadata associated with each upload (e.g.,
							timestamp, filename)
						</li>
						<li>
							IP address and browser/device type (for diagnostic
							purposes)
						</li>
					</ul>
					<p>We do not use cookies or third-party trackers.</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">
						How We Use Your Data
					</h2>
					<p>
						We use the data you provide to:
						<ul className="list-disc pl-6">
							<li>Process and analyze dialects in speech</li>
							<li>
								Improve the accuracy and fairness of our machine
								learning models
							</li>
							<li>
								Conduct research related to speech, language,
								and AI
							</li>
						</ul>
						Your data may be retained for long-term research and
						model training purposes.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Data Sharing</h2>
					<p>
						We do not sell your data. We do not share your
						recordings or personal information with third parties
						unless legally required to do so.
					</p>
					<p>
						In the future, anonymized or aggregated data may be used
						in academic research or publications.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">
						Data Retention & Deletion
					</h2>
					<p>
						We retain uploaded recordings indefinitely for model
						training purposes.
					</p>
					<p>
						If you wish to request deletion of a specific recording,
						email us at placeholder with the relevant timestamp or
						filename (if known). We may require additional
						information to verify your request.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Security</h2>
					<p>
						We take reasonable technical and organizational measures
						to protect your data. However, no system is 100% secure.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Eligiblity</h2>
					<p>
						AccentMe is not intended for use by individuals under
						the age of 13. If you are under the age of majority in
						your country (such as 18 or 19), you must have your
						parent or guardian’s consent and supervision to use this
						service. By uploading a recording, you confirm that you
						meet these requirements.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">
						Changes to This Policy
					</h2>
					<p>
						We may update this Privacy Policy at any time. Continued
						use of AccentMe after changes are posted means you
						accept the new policy.
					</p>
				</li>
				<li>
					<h2 className="text-xl font-semibold">Contact</h2>
					<p>For questions or concerns, contact us at: placeholder</p>
				</li>
			</ol>
		</div>
	);
}

export default Privacy;